using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ECommerce.Application.DTOs;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ECommerce.Domain.Models;
using ECommerce.Application.Services.Interfaces;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext db, IConfiguration config, IPasswordValidationService passwordValidation) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        try
        {
            Console.WriteLine($"🔐 Login attempt for: {dto.Email}");

            var user = await db.Users
                .Include(u => u.Role) // 🔑 Rol bilgisi için Include
                .SingleOrDefaultAsync(x => x.Email == dto.Email);

            if (user == null)
            {
                Console.WriteLine($"❌ User not found: {dto.Email}");
                return Unauthorized("Invalid credentials.");
            }

            Console.WriteLine($"✅ User found: {user.FullName}, Role: {user.Role?.Name}");

            bool verifyResult = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!verifyResult)
            {
                Console.WriteLine($"❌ Password verification failed for: {dto.Email}");
                return Unauthorized("Invalid credentials.");
            }

            Console.WriteLine($"✅ Password verified for: {dto.Email}");

            // JWT Claims oluştur
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Role claim'i ekle (null kontrolü ile)
            if (user.Role != null)
            {
                claims.Add(new Claim(ClaimTypes.Role, user.Role.Name));
                Console.WriteLine($"🎭 Role added to token: {user.Role.Name}");
            }
            else
            {
                Console.WriteLine($"⚠️ User has no role assigned: {user.Email}");
            }

            // JWT ayarlarını logla
            var jwtKey = config["Jwt:Key"];
            var jwtIssuer = config["Jwt:Issuer"];
            var jwtAudience = config["Jwt:Audience"];

            Console.WriteLine($"🔧 JWT Config - Key Length: {jwtKey?.Length}, Issuer: {jwtIssuer}, Audience: {jwtAudience}");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(3),
                Issuer = jwtIssuer,
                Audience = jwtAudience,
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            Console.WriteLine($"✅ JWT Token created successfully");
            Console.WriteLine($"📏 Token length: {tokenString.Length}");
            Console.WriteLine($"🔤 Token preview: {tokenString.Substring(0, Math.Min(50, tokenString.Length))}...");

            return Ok(new { 
                token = tokenString,
                user = new {
                    id = user.Id,
                    fullName = user.FullName,
                    email = user.Email,
                    role = user.Role?.Name
                }
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"🚫 Login error: {ex.Message}");
            Console.WriteLine($"📍 Stack trace: {ex.StackTrace}");
            return StatusCode(500, "Internal server error during login.");
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDTO dto)
    {
        try
        {
            Console.WriteLine($"🔍 Registration attempt for: {dto.Email}");

            // ModelState validation kontrolü (includes password confirmation)
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                
                Console.WriteLine($"❌ ModelState validation failed: {string.Join(", ", errors)}");
                
                return BadRequest(new { 
                    message = "Giriş bilgilerinde hata var.",
                    errors = errors,
                    success = false
                });
            }

            // Şifre güvenlik kontrolü
            var passwordValidationResult = await passwordValidation.ValidateAsync(dto.Password);
            if (!passwordValidationResult.IsValid)
            {
                Console.WriteLine($"❌ Password validation failed: {string.Join(", ", passwordValidationResult.Errors)}");
                
                return BadRequest(new { 
                    message = "Şifre güvenlik koşullarını karşılamıyor.",
                    errors = passwordValidationResult.Errors,
                    success = false
                });
            }

            // E-posta mevcut mu kontrolü
            bool emailExists = await db.Users.AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower());
            if (emailExists)
            {
                Console.WriteLine($"❌ Email already exists: {dto.Email}");
                
                return BadRequest(new { 
                    message = "Bu e-posta adresi zaten kayıtlı.",
                    errors = new List<string> { "Bu e-posta adresi zaten kayıtlı." },
                    success = false
                });
            }

            // Customer rolünü bul
            var role = await db.Roles.FirstOrDefaultAsync(r => r.Name == "Customer");
            if (role == null)
            {
                Console.WriteLine("❌ Customer role not found in database");
                
                return StatusCode(500, new { 
                    message = "Sistem hatası oluştu. Lütfen daha sonra tekrar deneyin.",
                    errors = new List<string> { "Customer rolü bulunamadı." },
                    success = false
                });
            }

            // Şifre hash'leme
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Yeni kullanıcı oluştur
            var user = new User
            {
                FullName = dto.FullName.Trim(),
                Email = dto.Email.Trim().ToLowerInvariant(),
                PasswordHash = passwordHash,
                RoleId = role.Id,
                BirthDate = dto.BirthDate,
                Gender = dto.Gender
            };

            Console.WriteLine($"🔄 Adding new user to database: {user.Email}");

            db.Users.Add(user);
            await db.SaveChangesAsync();

            Console.WriteLine($"✅ New user registered successfully: {dto.Email}");

            return Ok(new { 
                message = "Kayıt başarıyla tamamlandı. Giriş yapabilirsiniz.",
                success = true 
            });
        }
        catch (DbUpdateException dbEx)
        {
            Console.WriteLine($"🚫 Database error during registration: {dbEx.Message}");
            Console.WriteLine($"📍 Inner exception: {dbEx.InnerException?.Message}");
            
            // Check if it's a unique constraint violation
            if (dbEx.InnerException?.Message?.Contains("duplicate") == true || 
                dbEx.InnerException?.Message?.Contains("UNIQUE") == true)
            {
                return BadRequest(new { 
                    message = "Bu e-posta adresi zaten kayıtlı.",
                    errors = new List<string> { "Bu e-posta adresi zaten kayıtlı." },
                    success = false
                });
            }
            
            return StatusCode(500, new { 
                message = "Veritabanı hatası oluştu. Lütfen daha sonra tekrar deneyin.",
                errors = new List<string> { "Veritabanı işlemi başarısız." },
                success = false
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"🚫 Registration error: {ex.Message}");
            Console.WriteLine($"📍 Stack trace: {ex.StackTrace}");
            
            return StatusCode(500, new { 
                message = "Kayıt sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
                errors = new List<string> { "Sistem hatası oluştu." },
                success = false
            });
        }
    }
}