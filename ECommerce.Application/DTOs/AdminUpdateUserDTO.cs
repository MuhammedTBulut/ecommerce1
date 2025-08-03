using System;

namespace ECommerce.Application.DTOs
{
    public class AdminUpdateUserDTO
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Password { get; set; } // Optional - only update if provided
        public int RoleId { get; set; }
        public DateTime BirthDate { get; set; }
        public bool? Gender { get; set; }
    }
}