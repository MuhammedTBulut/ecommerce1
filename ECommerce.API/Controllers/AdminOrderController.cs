using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Infrastructure.Data;
using ECommerce.Application.DTOs;

namespace ECommerce.API.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/orders")]
public class AdminOrdersController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<AdminOrderListDTO>>> GetAll()
    {
        var orders = await db.Orders
            .Include(o => o.User)
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .Select(o => new AdminOrderListDTO(
                o.Id,
                o.User.FullName,
                o.CreatedAt,
                o.Items.Sum(i => i.Quantity * i.Product.Price)
            ))
            .ToListAsync();

        return Ok(orders);
    }
}