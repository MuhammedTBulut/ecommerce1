using System.Text.Json.Serialization;

namespace ECommerce.Application.DTOs;

public record LoginDTO(
    [property: JsonPropertyName("email")] string Email,
    [property: JsonPropertyName("password")] string Password
);