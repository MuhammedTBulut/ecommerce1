namespace ECommerce.Domain.Enums;

public enum OrderStatus
{
    Pending = 0,      // Beklemede
    Confirmed = 1,    // Onaylandı
    Shipped = 2,      // Kargoda
    Delivered = 3,    // Teslim edildi
    Cancelled = 4     // İptal edildi
}