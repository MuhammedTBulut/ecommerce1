using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
   public record OrderDetailDTO(
    int Id,
    DateTime CreatedAt,
    List<OrderProductDTO> Products,
    decimal TotalPrice
);

public record OrderProductDTO(string Name, decimal Price, int Quantity);
}