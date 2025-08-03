using ECommerce.Domain.Enums;

namespace ECommerce.Application.DTOs
{
   public record OrderDetailDTO(
    int Id,
    DateTime CreatedAt,
    List<OrderProductDTO> Products,
    decimal TotalPrice,
    OrderStatus Status,
    string CustomerName
);

public record OrderProductDTO(string Name, decimal Price, int Quantity);
}