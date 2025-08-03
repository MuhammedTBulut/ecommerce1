using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Application.DTOs;
using ECommerce.Infrastructure.Data;
using ECommerce.Domain.Models;

namespace ECommerce.API.Controllers.Admin;

[ApiController]
[Route("api/admin/products")]
[Authorize(Roles = "Admin")]
public class AdminProductsController(AppDbContext db) : ControllerBase
{
    // GET: /api/admin/products
    [HttpGet]
    public async Task<ActionResult<List<ProductListDTO>>> GetProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? search = null)
    {
        var query = db.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .AsQueryable();

        // Apply search filter
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p => p.Name.Contains(search) || p.Description.Contains(search));
        }

        var totalCount = await query.CountAsync();
        
        var products = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProductListDTO(
                p.Id,
                p.Name,
                p.Price,
                p.CategoryId,
                p.Category.Name,
                p.ImageUrl
            )).ToListAsync();

        return Ok(new { 
            data = products, 
            total = totalCount, 
            page, 
            pageSize
        });
    }

    // GET: /api/admin/products/{id}
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

    // POST: /api/admin/products
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

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, new { id = product.Id });
    }

    // PUT: /api/admin/products/{id}
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
        return Ok(new { message = "Product updated successfully" });
    }

    // DELETE: /api/admin/products/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();

        db.Products.Remove(product);
        await db.SaveChangesAsync();
        
        return Ok(new { message = "Product deleted successfully" });
    }
}