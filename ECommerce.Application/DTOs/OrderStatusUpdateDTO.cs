using System.ComponentModel.DataAnnotations;
using ECommerce.Domain.Enums;

namespace ECommerce.Application.DTOs
{
    public record OrderStatusUpdateDTO(
        [Required(ErrorMessage = "Sipariş durumu zorunludur.")]
        [EnumDataType(typeof(OrderStatus), ErrorMessage = "Geçerli bir sipariş durumu seçmelisiniz.")]
        OrderStatus Status
    );
}