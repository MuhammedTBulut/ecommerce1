using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs
{
    public record ProductUpdateDTO(
        [Required(ErrorMessage = "Ürün adı zorunludur.")]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Ürün adı 2-200 karakter arasında olmalıdır.")]
        string Name,
        
        [StringLength(1000, ErrorMessage = "Açıklama 1000 karakterden uzun olamaz.")]
        string Description,
        
        [Required(ErrorMessage = "Fiyat zorunludur.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Fiyat 0'dan büyük olmalıdır.")]
        decimal Price,
        
        [Required(ErrorMessage = "Stok miktarı zorunludur.")]
        [Range(0, int.MaxValue, ErrorMessage = "Stok miktarı negatif olamaz.")]
        int Stock,
        
        [Required(ErrorMessage = "Kategori zorunludur.")]
        [Range(1, int.MaxValue, ErrorMessage = "Geçerli bir kategori seçmelisiniz.")]
        int CategoryId,
        
        [Url(ErrorMessage = "Geçerli bir URL giriniz.")]
        string? ImageUrl
    ); 
}