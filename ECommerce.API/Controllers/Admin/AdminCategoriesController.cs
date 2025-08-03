using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.API.Controllers.Admin;

[ApiController]
[Route("api/admin/categories")]
[Authorize(Roles = "Admin")]
public class AdminCategoriesController(AppDbContext db, IMemoryCache cache, ILogger<AdminCategoriesController> logger) : ControllerBase
{
    private const string CacheKey = "categories";
    private readonly TimeSpan CacheExpiration = TimeSpan.FromMinutes(30);

    // GET: /api/admin/categories
    [HttpGet]
    public async Task<ActionResult<List<CategoryDTO>>> GetCategories([FromQuery] int page = 1, [FromQuery] int pageSize = 100)
    {
        // For admin, we don't use cache to ensure fresh data
        var query = db.Categories.AsNoTracking().AsQueryable();
        
        var totalCount = await query.CountAsync();
        
        var categories = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new CategoryDTO(c.Id, c.Name))
            .ToListAsync();

        return Ok(new { 
            data = categories, 
            total = totalCount, 
            page, 
            pageSize
        });
    }

    // GET: /api/admin/categories/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
    {
        var category = await db.Categories
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new CategoryDTO(c.Id, c.Name))
            .FirstOrDefaultAsync();

        return category is null ? NotFound() : Ok(category);
    }

    // POST: /api/admin/categories
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryCreateDTO dto)
    {
        var category = new Category { Name = dto.Name };
        db.Categories.Add(category);
        await db.SaveChangesAsync();

        // Invalidate cache after creating new category
        cache.Remove(CacheKey);
        logger.LogInformation("Categories cache invalidated after creating new category: {CategoryName}", dto.Name);

        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, new { id = category.Id });
    }

    // PUT: /api/admin/categories/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryCreateDTO dto)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null) return NotFound();

        category.Name = dto.Name;
        await db.SaveChangesAsync();

        // Invalidate cache after updating category
        cache.Remove(CacheKey);
        logger.LogInformation("Categories cache invalidated after updating category ID: {CategoryId}", id);

        return Ok(new { message = "Category updated successfully" });
    }

    // DELETE: /api/admin/categories/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null) return NotFound();

        db.Categories.Remove(category);
        await db.SaveChangesAsync();

        // Invalidate cache after deleting category
        cache.Remove(CacheKey);
        logger.LogInformation("Categories cache invalidated after deleting category ID: {CategoryId}", id);

        return Ok(new { message = "Category deleted successfully" });
    }
}