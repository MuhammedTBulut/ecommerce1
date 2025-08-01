
namespace ECommerce.Domain.Models;

public class ProductComment
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int UserId { get; set; }

    public string Content { get; set; }=null!;
    public DateTime CreatedAt { get; set; }

    public Product Product { get; set; }=null!;
    public User User { get; set; }=null!;
}
