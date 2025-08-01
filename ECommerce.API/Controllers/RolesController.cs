using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Domain.Models;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/admin/roles")]
[Authorize(Roles = "Admin")]
public class RolesController(AppDbContext db) : ControllerBase
{
    // GET: /api/admin/roles
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var roles = await db.Roles
            .AsNoTracking()
            .ToListAsync();

        return Ok(roles);
    }

    // POST: /api/admin/roles
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Rol adı boş olamaz.");

        bool exists = await db.Roles.AnyAsync(r => r.Name.ToLower() == name.ToLower());
        if (exists)
            return BadRequest("Bu rol zaten mevcut.");

        var role = new Role { Name = name };
        db.Roles.Add(role);
        await db.SaveChangesAsync();

        return Ok(new { message = "Rol başarıyla oluşturuldu.", role.Id, role.Name });
    }

    // DELETE: /api/admin/roles/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var role = await db.Roles.FindAsync(id);
        if (role is null)
            return NotFound("Rol bulunamadı.");

        db.Roles.Remove(role);
        await db.SaveChangesAsync();

        return Ok("Rol başarıyla silindi.");
    }

    // PUT: /api/admin/roles/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] string newName)
    {
        if (string.IsNullOrWhiteSpace(newName))
            return BadRequest("Yeni rol adı boş olamaz.");

        var role = await db.Roles.FindAsync(id);
        if (role is null)
            return NotFound("Rol bulunamadı.");

        role.Name = newName;
        await db.SaveChangesAsync();

        return Ok("Rol başarıyla güncellendi.");
    }
}