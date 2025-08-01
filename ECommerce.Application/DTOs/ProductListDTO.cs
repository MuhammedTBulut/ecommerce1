using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public record ProductListDTO(int Id,
    string Name,
    decimal Price,
    int CategoryId,
    string CategoryName,
    string ImageUrl); 

}