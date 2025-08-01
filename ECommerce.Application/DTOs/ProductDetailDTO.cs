using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
   public record ProductDetailDTO(int Id,
    string Name,
    string Description,
    decimal Price,
    int Stock,
    int CategoryId,
    string CategoryName,
    string ImageUrl); 

}