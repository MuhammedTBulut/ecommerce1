
namespace ECommerce.Domain.Models;

public class PaymentInfo
{
    public int Id { get; set; }
    public int OrderId { get; set; }

    public string Status { get; set; }  =null!;    // "Paid", "Pending", "Failed"
    public DateTime PaidAt { get; set; }

    public Order Order { get; set; }=null!;
}
