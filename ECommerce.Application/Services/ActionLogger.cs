using ECommerce.Application.Services.Interfaces;
using ECommerce.Domain.Models;
using ECommerce.Infrastructure.Data;
using ECommerce.Infrastructure;
namespace ECommerce.Infrastructure.Services;

public class ActionLoggerService(AppDbContext db) : IActionLogger
{
    public async Task LogAsync(int userId, string actionType, string description)
    {
        var log = new ActionLog
        {
            UserId = userId,
            ActionType = actionType,
            Description = description,
            Timestamp = DateTime.UtcNow
        };

        db.ActionLogs.Add(log);
        await db.SaveChangesAsync();
    }
}