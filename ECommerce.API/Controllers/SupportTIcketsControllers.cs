using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Infrastructure.Data;
using ECommerce.Application.DTOs;
using System.Security.Claims;
using ECommerce.Domain.Models;

namespace ECommerce.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SupportTicketsController(AppDbContext db) : ControllerBase
{
    // Kullanıcı kendi ticket’ını oluşturur
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SupportTicketCreateDTO dto)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var ticket = new SupportTicket
        {
            UserId = userId,
            Subject = dto.Subject,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow,
            IsResolved = false
        };

        db.SupportTickets.Add(ticket);
        await db.SaveChangesAsync();

        return StatusCode(201);
    }

    // Admin tüm ticket’ları görür
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<List<SupportTicketDTO>>> GetAll()
    {
        var tickets = await db.SupportTickets
            .Include(t => t.User)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new SupportTicketDTO(
                t.Id,
                t.Subject,
                t.Message,
                t.CreatedAt,
                t.IsResolved,
                t.User.FullName
            )).ToListAsync();

        return tickets;
    }

    // Admin çözümledi olarak işaretler
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/resolve")]
    public async Task<IActionResult> Resolve(int id)
    {
        var ticket = await db.SupportTickets.FindAsync(id);
        if (ticket is null) return NotFound();

        ticket.IsResolved = true;
        await db.SaveChangesAsync();

        return NoContent();
    }
}