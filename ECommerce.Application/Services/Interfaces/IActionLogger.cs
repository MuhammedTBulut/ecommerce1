using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.Services.Interfaces
{
    public interface IActionLogger
    {
            Task LogAsync(int userId, string action, string? description = null);

    }
}