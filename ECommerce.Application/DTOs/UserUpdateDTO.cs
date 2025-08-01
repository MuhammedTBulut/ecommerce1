using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{ public class UserUpdateDTO
{
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Password { get; set; }
    public DateTime BirthDate { get; set; }
    public bool? Gender { get; set; }
}
    
}
   