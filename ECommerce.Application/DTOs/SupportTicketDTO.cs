using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public record SupportTicketDTO(int Id, string Subject, string Message, DateTime CreatedAt, bool IsResolved, string UserFullName);
}