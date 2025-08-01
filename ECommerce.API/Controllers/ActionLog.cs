using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Domain.Models;

public class ActionLog
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Action { get; set; } = null!;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? Description { get; set; }

    public User User { get; set; } = null!;
}