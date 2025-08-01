using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(AppDbContext db) : ControllerBase
{
    // Herkes görebilir (kategori listeleme)
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<CategoryDTO>>> GetCategories()
    {
        var categories = await db.Categories
            .AsNoTracking()
            .Select(c => new CategoryDTO(c.Id, c.Name))
            .ToListAsync();

        return Ok(categories);
    }

    // Sadece admin yeni kategori ekleyebilir
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryCreateDTO dto)
    {
        var category = new Category { Name = dto.Name };
        db.Categories.Add(category);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category.Id);
    }

    // Admin kategori güncelleyebilir
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryCreateDTO dto)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null) return NotFound();

        category.Name = dto.Name;
        await db.SaveChangesAsync();

        return NoContent();
    }

    // Admin kategori silebilir
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null) return NotFound();

        db.Categories.Remove(category);
        await db.SaveChangesAsync();

        return NoContent();
    }
}