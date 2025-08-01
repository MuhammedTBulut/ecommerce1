using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = "Admin")]
public class AdminUsersController(AppDbContext db) : ControllerBase
{
    // POST: /api/admin/users
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] AdminCreateUserDTO dto)
    {
        if (await db.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("Bu e-posta adresi zaten kayıtlı.");

        var role = await db.Roles.FindAsync(dto.RoleId);
        if (role == null)
            return BadRequest("Geçersiz rol.");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = passwordHash,
            RoleId = dto.RoleId,
            BirthDate = dto.BirthDate,
            Gender = dto.Gender
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return Ok("Yeni kullanıcı başarıyla oluşturuldu.");
    }

    // (İsteğe bağlı) GET: /api/admin/roles - Rolleri listele
    [HttpGet("roles")]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await db.Roles
            .AsNoTracking()
            .Select(r => new { r.Id, r.Name })
            .ToListAsync();

        return Ok(roles);
    }
}