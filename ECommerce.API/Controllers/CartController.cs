using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ECommerce.Infrastructure.Data;
using ECommerce.Domain.Models;
using ECommerce.Application.DTOs;

namespace ECommerce.API.Controllers;

[Authorize] // sadece giriş yapmış kullanıcılar
[ApiController]
[Route("api/[controller]")]
public class CartController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<CartItemDTO>>> GetCart()
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var items = await db.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.UserId == userId)
            .Select(ci => new CartItemDTO(
    ci.Id,
    ci.Product.Id,
    ci.Product.Name,
    ci.Product.Price,
    ci.Product.ImageUrl,
    ci.Quantity
)).ToListAsync();

        return Ok(items);
    }


    [HttpPost]
    public async Task<IActionResult> AddToCart(AddToCartDTO dto)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var existing = await db.CartItems
            .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == dto.ProductId);

        if (existing is not null)
        {
            existing.Quantity += dto.Quantity;
        }
        else
        {
            db.CartItems.Add(new CartItem
            {
                UserId = userId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            });
        }

        await db.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuantity(int id, [FromBody] int quantity)
    {
        var item = await db.CartItems.FindAsync(id);
        if (item == null) return NotFound();

        item.Quantity = quantity;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveItem(int id)
    {
        var item = await db.CartItems.FindAsync(id);
        if (item == null) return NotFound();

        db.CartItems.Remove(item);
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart()
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var items = await db.CartItems.Where(ci => ci.UserId == userId).ToListAsync();
        db.CartItems.RemoveRange(items);

        await db.SaveChangesAsync();
        return NoContent();
    }
}