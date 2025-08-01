using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public record ProductCommentCreateDTO(
        int ProductId,
        string Comment,
        int Rating // 1-5 puan
    );
}