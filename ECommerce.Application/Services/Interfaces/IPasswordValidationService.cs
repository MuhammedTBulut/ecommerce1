using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.Services.Interfaces
{
    public interface IPasswordValidationService
    {
        /// <summary>
        /// Validates password according to security requirements
        /// </summary>
        /// <param name="password">Password to validate</param>
        /// <returns>Validation result with error messages in Turkish</returns>
        Task<PasswordValidationResult> ValidateAsync(string password);
    }

    public class PasswordValidationResult
    {
        public bool IsValid { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}