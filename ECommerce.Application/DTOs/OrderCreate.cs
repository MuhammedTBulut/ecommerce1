using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public record OrderCreateDTO(List<OrderItemDTO> Items);

public record OrderItemDTO(int ProductId, int Quantity);
}