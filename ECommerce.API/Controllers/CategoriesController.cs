using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(AppDbContext db, IMemoryCache cache, ILogger<CategoriesController> logger) : ControllerBase
{
    private const string CacheKey = "categories";
    private readonly TimeSpan CacheExpiration = TimeSpan.FromMinutes(30);
    // Herkes görebilir (kategori listeleme)
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<CategoryDTO>>> GetCategories()
    {
        // Check cache first
        if (cache.TryGetValue(CacheKey, out List<CategoryDTO>? cachedCategories))
        {
            logger.LogInformation("Categories retrieved from cache");
            return Ok(cachedCategories);
        }

        logger.LogInformation("Categories not found in cache, fetching from database");
        
        var categories = await db.Categories
            .AsNoTracking()
            .Select(c => new CategoryDTO(c.Id, c.Name))
            .ToListAsync();

        // Cache the result for 30 minutes
        cache.Set(CacheKey, categories, CacheExpiration);
        logger.LogInformation("Categories cached for {Duration} minutes", CacheExpiration.TotalMinutes);

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

        // Invalidate cache after creating new category
        cache.Remove(CacheKey);
        logger.LogInformation("Categories cache invalidated after creating new category: {CategoryName}", dto.Name);

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

        // Invalidate cache after updating category
        cache.Remove(CacheKey);
        logger.LogInformation("Categories cache invalidated after updating category ID: {CategoryId}", id);

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

        // Invalidate cache after deleting category
        cache.Remove(CacheKey);
        logger.LogInformation("Categories cache invalidated after deleting category ID: {CategoryId}", id);

        return NoContent();
    }
}