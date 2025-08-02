
namespace ECommerce.Domain.Models;

public class ProductComment
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int UserId { get; set; }

    public string Comment { get; set; } = string.Empty;
    public int Rating { get; set; } // 1-5 arası puan
    public DateTime CreatedAt { get; set; }

    public Product Product { get; set; } = null!;
    public User User { get; set; } = null!;
}
