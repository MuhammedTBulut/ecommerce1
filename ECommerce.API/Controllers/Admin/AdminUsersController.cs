using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;

namespace ECommerce.API.Controllers.Admin;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = "Admin")]
public class AdminUsersController(AppDbContext db) : ControllerBase
{
    // GET: /api/admin/users
    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? search = null)
    {
        var query = db.Users.Include(u => u.Role).AsQueryable();

        // Apply search filter
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(u => u.FullName.Contains(search) || u.Email.Contains(search));
        }

        var totalCount = await query.CountAsync();
        
        var users = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new UserDTO(u.Id, u.FullName, u.Email, u.Role.Name, u.Gender, u.BirthDate))
            .ToListAsync();

        return Ok(new { 
            users, 
            totalCount, 
            currentPage = page, 
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        });
    }

    // GET: /api/admin/users/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await db.Users
            .Include(u => u.Role)
            .Where(u => u.Id == id)
            .Select(u => new {
                u.Id,
                u.FullName,
                u.Email,
                u.RoleId,
                RoleName = u.Role.Name,
                u.Gender,
                u.BirthDate
            })
            .FirstOrDefaultAsync();

        if (user == null)
            return NotFound("Kullanıcı bulunamadı.");

        return Ok(user);
    }

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

    // PUT: /api/admin/users/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] AdminUpdateUserDTO dto)
    {
        var user = await db.Users.FindAsync(id);
        if (user == null)
            return NotFound("Kullanıcı bulunamadı.");

        // Check if email is already taken by another user
        if (await db.Users.AnyAsync(u => u.Email == dto.Email && u.Id != id))
            return BadRequest("Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor.");

        var role = await db.Roles.FindAsync(dto.RoleId);
        if (role == null)
            return BadRequest("Geçersiz rol.");

        user.FullName = dto.FullName;
        user.Email = dto.Email;
        user.RoleId = dto.RoleId;
        user.BirthDate = dto.BirthDate;
        user.Gender = dto.Gender;

        // Update password if provided
        if (!string.IsNullOrWhiteSpace(dto.Password))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        await db.SaveChangesAsync();

        return Ok("Kullanıcı başarıyla güncellendi.");
    }

    // DELETE: /api/admin/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await db.Users.FindAsync(id);
        if (user == null)
            return NotFound("Kullanıcı bulunamadı.");

        db.Users.Remove(user);
        await db.SaveChangesAsync();

        return Ok("Kullanıcı başarıyla silindi.");
    }

    // GET: /api/admin/users/roles
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