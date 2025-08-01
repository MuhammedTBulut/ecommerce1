using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
   public record OrderListDTO(
    int Id,
    DateTime CreatedAt,
    decimal TotalPrice
);
}