namespace ECommerce.Domain.Models;

public class SupportTicket
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Subject { get; set; } = null!;
    public string Message { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsResolved { get; set; } = false;

    public User User { get; set; } = null!;
}