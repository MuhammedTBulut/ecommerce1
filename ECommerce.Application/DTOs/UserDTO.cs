using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ECommerce.Application.DTOs
{
public record UserDTO(int Id, string FullName, string Email, string Role, bool? Gender, DateTime? BirthDate);
}