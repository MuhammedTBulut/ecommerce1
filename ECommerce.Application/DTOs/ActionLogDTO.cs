using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
   
public record ActionLogDTO(int UserId, string Action, string? Description);
}