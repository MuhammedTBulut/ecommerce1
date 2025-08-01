using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ECommerce.Infrastructure.Data;
using ECommerce.Application.DTOs;
using BCrypt.Net;
using ECommerce.Domain.Models;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(AppDbContext db) : ControllerBase
{
    // GET /api/users/me
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDTO>> Me()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized("Geçersiz kullanıcı kimliği.");

        var dto = await db.Users
            .AsNoTracking()
            .Include(u => u.Role) // 🔁 Rolü dahil et
            .Where(u => u.Id == userId)
            .Select(u => new UserDTO(
                u.Id,
                u.FullName,
                u.Email,
                u.Role.Name, // 🔁 enum değil, ilişkili tablodaki name
                u.Gender,
                u.BirthDate
            ))
            .SingleOrDefaultAsync();

        return dto is null ? NotFound() : Ok(dto);
    }

    // PUT /api/users/me
    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMe([FromBody] UserUpdateDTO dto)
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized();

        var user = await db.Users.FindAsync(userId);
        if (user is null) return NotFound();

        user.FullName = dto.FullName;
        user.Email = dto.Email;
        user.BirthDate = dto.BirthDate;
        user.Gender = dto.Gender;

        if (!string.IsNullOrWhiteSpace(dto.Password))
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        await db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/users/me
    [Authorize]
    [HttpDelete("me")]
    public async Task<IActionResult> DeleteMe()
    {
        var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(idClaim) || !int.TryParse(idClaim, out int userId))
            return Unauthorized();

        var user = await db.Users.FindAsync(userId);
        if (user is null) return NotFound();

        db.Users.Remove(user);
        await db.SaveChangesAsync();

        return NoContent();
    }
}