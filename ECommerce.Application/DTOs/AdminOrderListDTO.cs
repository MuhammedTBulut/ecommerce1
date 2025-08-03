using ECommerce.Domain.Enums;

namespace ECommerce.Application.DTOs
{
    public record AdminOrderListDTO(int Id, string CustomerName, DateTime CreatedAt, decimal TotalAmount, OrderStatus Status);
}