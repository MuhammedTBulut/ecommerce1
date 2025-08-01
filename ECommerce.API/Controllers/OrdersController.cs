using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ECommerce.Infrastructure.Data;
using ECommerce.Domain.Models;
using ECommerce.Application.DTOs;

namespace ECommerce.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController(AppDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(OrderCreateDTO dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Stok kontrolü
        foreach (var item in dto.Items)
        {
            var product = await db.Products.FindAsync(item.ProductId);
            if (product == null)
                return BadRequest($"Ürün bulunamadı (ID: {item.ProductId})");

            if (product.Stock < item.Quantity)
                return BadRequest($"Yetersiz stok: {product.Name} (stok: {product.Stock})");
        }

        // Sipariş ve ürünleri ekle
        var order = new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Items = dto.Items.Select(x => new OrderItem
            {
                ProductId = x.ProductId,
                Quantity = x.Quantity
            }).ToList()
        };

        db.Orders.Add(order);

        // Stok güncelle
        foreach (var item in dto.Items)
        {
            var product = await db.Products.FindAsync(item.ProductId);
            product!.Stock -= item.Quantity;
        }

        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDetail), new { id = order.Id }, order.Id);
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderListDTO>>> GetMyOrders()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var orders = await db.Orders
            .Where(o => o.UserId == userId)
            .Select(o => new OrderListDTO(
                o.Id,
                o.CreatedAt,
                o.Items.Sum(i => i.Quantity * i.Product.Price)
            )).ToListAsync();

        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDetailDTO>> GetDetail(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var isAdmin = User.IsInRole("Admin");

        var order = await db.Orders
            .Include(o => o.Items).ThenInclude(i => i.Product)
            .Where(o => o.Id == id && (o.UserId == userId || isAdmin))
            .SingleOrDefaultAsync();

        if (order is null) return NotFound();

        var dto = new OrderDetailDTO(
            order.Id,
            order.CreatedAt,
            order.Items.Select(i => new OrderProductDTO(
                i.Product.Name,
                i.Product.Price,
                i.Quantity
            )).ToList(),
            order.Items.Sum(i => i.Quantity * i.Product.Price)
        );

        return Ok(dto);
    }
}