using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{

     public class UserRegisterDTO
{
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public DateTime BirthDate { get; set; }
    public bool? Gender { get; set; }
}
    
}