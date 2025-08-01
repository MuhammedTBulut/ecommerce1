
namespace ECommerce.Domain.Models;

public class AppSetting
{
    public int Id { get; set; }
    public string Key { get; set; } = null!;  // "TaxRate", "Currency", etc.
    public string Value { get; set; } = null!;  // "0.18"
}
