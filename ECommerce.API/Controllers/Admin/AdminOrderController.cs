using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Infrastructure.Data;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Enums;

namespace ECommerce.API.Controllers.Admin;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/orders")]
public class AdminOrdersController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<AdminOrderListDTO>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var query = db.Orders
            .Include(o => o.User)
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .AsQueryable();

        var totalCount = await query.CountAsync();

        var orders = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new AdminOrderListDTO(
                o.Id,
                o.User.FullName,
                o.CreatedAt,
                o.Items.Sum(i => i.Quantity * i.Product.Price),
                o.Status
            ))
            .ToListAsync();

        return Ok(new { 
            orders, 
            totalCount, 
            currentPage = page, 
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDetailDTO>> GetById(int id)
    {
        var order = await db.Orders
            .Include(o => o.User)
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .Where(o => o.Id == id)
            .Select(o => new OrderDetailDTO(
                o.Id,
                o.CreatedAt,
                o.Items.Select(i => new OrderProductDTO(i.Product.Name, i.Product.Price, i.Quantity)).ToList(),
                o.Items.Sum(i => i.Quantity * i.Product.Price),
                o.Status,
                o.User.FullName
            ))
            .FirstOrDefaultAsync();

        return order is null ? NotFound("Sipariş bulunamadı.") : Ok(order);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] OrderStatusUpdateDTO dto)
    {
        var order = await db.Orders.FindAsync(id);
        if (order is null) 
            return NotFound("Sipariş bulunamadı.");

        order.Status = dto.Status;
        await db.SaveChangesAsync();

        return Ok("Sipariş durumu başarıyla güncellendi.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var order = await db.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);
            
        if (order is null) 
            return NotFound("Sipariş bulunamadı.");

        db.Orders.Remove(order);
        await db.SaveChangesAsync();

        return Ok("Sipariş başarıyla silindi.");
    }
}