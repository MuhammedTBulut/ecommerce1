using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs
{
    public class UserRegisterDTO : IValidatableObject
    {
        [Required(ErrorMessage = "Ad Soyad zorunludur.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Ad Soyad 2-100 karakter arasında olmalıdır.")]
        public string FullName { get; set; } = null!;

        [Required(ErrorMessage = "E-posta adresi zorunludur.")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz.")]
        [StringLength(254, ErrorMessage = "E-posta adresi 254 karakterden uzun olamaz.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Şifre zorunludur.")]
        public string Password { get; set; } = null!;

        [Required(ErrorMessage = "Şifre tekrarı zorunludur.")]
        public string ConfirmPassword { get; set; } = null!;

        [Required(ErrorMessage = "Doğum tarihi zorunludur.")]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }

        public bool? Gender { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Password != ConfirmPassword)
            {
                yield return new ValidationResult(
                    "Şifre ve şifre tekrarı eşleşmiyor.",
                    new[] { nameof(ConfirmPassword) }
                );
            }
        }
    }
}