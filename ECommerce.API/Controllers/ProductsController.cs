using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Application.DTOs;
using ECommerce.Infrastructure.Data;
using ECommerce.Domain.Models; 

namespace ECommerce.API.Controllers;

[Authorize(AuthenticationSchemes = "Bearer")]
[ApiController]
[Route("api/[controller]")]
public class ProductsController(AppDbContext db) : ControllerBase
{
    // Herkes erişebilir (login olmak şart değil)
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<ProductListDTO>>> GetProducts(
        [FromQuery] int? categoryId,
        [FromQuery] string? search,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice)
    {
        var query = db.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .AsQueryable();

        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search));
        if (minPrice.HasValue)
            query = query.Where(p => p.Price >= minPrice);
        if (maxPrice.HasValue)
            query = query.Where(p => p.Price <= maxPrice);

        var products = await query
            .Select(p => new ProductListDTO(
                p.Id,
                p.Name,
                p.Price,
                p.CategoryId,
                p.Category.Name,
                p.ImageUrl
            )).ToListAsync();

        return Ok(products);
    }

    // Herkes erişebilir
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDetailDTO>> GetProduct(int id)
    {
        var product = await db.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Select(p => new ProductDetailDTO(
                p.Id,
                p.Name,
                p.Description,
                p.Price,
                p.Stock,
                p.CategoryId,
                p.Category.Name,
                p.ImageUrl
            )).SingleOrDefaultAsync();

        return product is null ? NotFound() : Ok(product);
    }

    // Admin'e özel
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] ProductCreateDTO dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product.Id);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductUpdateDTO dto)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Stock = dto.Stock;
        product.CategoryId = dto.CategoryId;
        product.ImageUrl = dto.ImageUrl;

        await db.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();

        db.Products.Remove(product);
        await db.SaveChangesAsync();

        return NoContent();
    }
}