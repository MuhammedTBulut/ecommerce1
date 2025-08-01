using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs { public record UserCreateDTO 
    (
        string FullName,
        string Email,
        string Password
    );

    
}

   
    
