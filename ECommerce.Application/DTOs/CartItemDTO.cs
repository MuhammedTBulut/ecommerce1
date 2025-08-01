using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public record CartItemDTO(
    int Id,
    int ProductId,
    string Name,
    decimal Price,
    string ImageUrl,
    int Quantity
);
}