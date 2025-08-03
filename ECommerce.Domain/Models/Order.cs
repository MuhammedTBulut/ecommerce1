
using ECommerce.Domain.Enums;

namespace ECommerce.Domain.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public User User { get; set; }=null!;
    public ICollection<OrderItem> Items { get; set; }=null!;
}
