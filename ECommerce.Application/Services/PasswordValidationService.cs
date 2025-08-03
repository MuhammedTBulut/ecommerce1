using ECommerce.Application.Services.Interfaces;
using System.Text.RegularExpressions;

namespace ECommerce.Application.Services
{
    public class PasswordValidationService : IPasswordValidationService
    {
        // Yaygın şifreler listesi (basit örnekler)
        private static readonly HashSet<string> CommonPasswords = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "password", "123456", "password123", "admin", "qwerty", "abc123", 
            "letmein", "monkey", "1234567890", "password1", "123456789"
        };

        public async Task<PasswordValidationResult> ValidateAsync(string password)
        {
            var result = new PasswordValidationResult();
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(password))
            {
                errors.Add("Şifre boş olamaz.");
                result.IsValid = false;
                result.Errors = errors;
                return result;
            }

            // Minimum 8 karakter kontrolü
            if (password.Length < 8)
            {
                errors.Add("Şifre en az 8 karakter olmalıdır.");
            }

            // Büyük harf kontrolü (A-Z)
            if (!password.Any(c => char.IsUpper(c)))
            {
                errors.Add("Şifre en az 1 büyük harf içermelidir (A-Z).");
            }

            // Küçük harf kontrolü (a-z)
            if (!password.Any(c => char.IsLower(c)))
            {
                errors.Add("Şifre en az 1 küçük harf içermelidir (a-z).");
            }

            // Sayı kontrolü (0-9)
            if (!password.Any(c => char.IsDigit(c)))
            {
                errors.Add("Şifre en az 1 sayı içermelidir (0-9).");
            }

            // Özel karakter kontrolü (!@#$%^&*)
            var specialChars = "!@#$%^&*";
            if (!password.Any(c => specialChars.Contains(c)))
            {
                errors.Add("Şifre en az 1 özel karakter içermelidir (!@#$%^&*).");
            }

            // Yaygın şifre kontrolü
            if (CommonPasswords.Contains(password))
            {
                errors.Add("Bu şifre çok yaygın kullanılmaktadır. Lütfen daha güvenli bir şifre seçin.");
            }

            result.IsValid = errors.Count == 0;
            result.Errors = errors;

            return await Task.FromResult(result);
        }
    }
}