using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs
{
    public record CategoryCreateDTO(
        [Required(ErrorMessage = "Kategori adı zorunludur.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Kategori adı 2-100 karakter arasında olmalıdır.")]
        string Name
    );
}