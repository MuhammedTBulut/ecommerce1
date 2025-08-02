using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ECommerce.Application.DTOs;
using ECommerce.Infrastructure.Data;
using ECommerce.Domain.Models;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductCommentsController(AppDbContext db) : ControllerBase
    {
        // POST /api/productcomments - Ürüne yorum ekleme (giriş yapmış kullanıcılar)
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] ProductCommentCreateDTO dto)
        {
            try
            {
                // Validation
                if (dto.Rating < 1 || dto.Rating > 5)
                {
                    return BadRequest("Rating must be between 1 and 5.");
                }

                if (string.IsNullOrWhiteSpace(dto.Comment) || dto.Comment.Length < 10 || dto.Comment.Length > 500)
                {
                    return BadRequest("Comment must be between 10 and 500 characters.");
                }

                int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

                // Check if product exists
                var productExists = await db.Products.AnyAsync(p => p.Id == dto.ProductId);
                if (!productExists)
                {
                    return BadRequest("Invalid product ID.");
                }

                // Check if user already commented on this product (one comment per user per product)
                var existingComment = await db.ProductComments
                    .FirstOrDefaultAsync(pc => pc.UserId == userId && pc.ProductId == dto.ProductId);

                if (existingComment != null)
                {
                    return BadRequest("You have already commented on this product. You can update your existing comment instead.");
                }

                var comment = new ProductComment
                {
                    ProductId = dto.ProductId,
                    UserId = userId,
                    Comment = dto.Comment.Trim(),
                    Rating = dto.Rating,
                    CreatedAt = DateTime.UtcNow
                };

                db.ProductComments.Add(comment);
                await db.SaveChangesAsync();

                // Return the created comment
                var user = await db.Users.FindAsync(userId);
                var createdComment = new ProductCommentDTO(
                    comment.Id,
                    comment.ProductId,
                    comment.Comment,
                    comment.Rating,
                    comment.CreatedAt,
                    user!.FullName
                );

                return CreatedAtAction(nameof(GetCommentsByProductId), new { productId = dto.ProductId }, createdComment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET /api/productcomments/{productId} - Ürünün yorumlarını listeleme (herkese açık)
        [AllowAnonymous]
        [HttpGet("{productId}")]
        public async Task<ActionResult<List<ProductCommentDTO>>> GetCommentsByProductId(int productId)
        {
            try
            {
                var comments = await db.ProductComments
                    .Include(pc => pc.User)
                    .Where(pc => pc.ProductId == productId)
                    .OrderByDescending(pc => pc.CreatedAt)
                    .Select(pc => new ProductCommentDTO(
                        pc.Id,
                        pc.ProductId,
                        pc.Comment,
                        pc.Rating,
                        pc.CreatedAt,
                        pc.User.FullName
                    ))
                    .ToListAsync();

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT /api/productcomments/{id} - Kendi yorumunu güncelleme (yorum sahibi)
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] ProductCommentUpdateDTO dto)
        {
            try
            {
                // Validation
                if (dto.Rating < 1 || dto.Rating > 5)
                {
                    return BadRequest("Rating must be between 1 and 5.");
                }

                if (string.IsNullOrWhiteSpace(dto.Comment) || dto.Comment.Length < 10 || dto.Comment.Length > 500)
                {
                    return BadRequest("Comment must be between 10 and 500 characters.");
                }

                int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

                var comment = await db.ProductComments
                    .Include(pc => pc.User)
                    .FirstOrDefaultAsync(pc => pc.Id == id);

                if (comment == null)
                {
                    return NotFound("Comment not found.");
                }

                // Check if user owns the comment
                if (comment.UserId != userId)
                {
                    return Forbid("You can only update your own comments.");
                }

                comment.Comment = dto.Comment.Trim();
                comment.Rating = dto.Rating;

                await db.SaveChangesAsync();

                var updatedComment = new ProductCommentDTO(
                    comment.Id,
                    comment.ProductId,
                    comment.Comment,
                    comment.Rating,
                    comment.CreatedAt,
                    comment.User.FullName
                );

                return Ok(updatedComment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE /api/productcomments/{id} - Yorum silme (yorum sahibi veya admin)
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            try
            {
                int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
                
                // Get user role to check if admin
                var userRole = User.FindFirstValue(ClaimTypes.Role);

                var comment = await db.ProductComments.FindAsync(id);

                if (comment == null)
                {
                    return NotFound("Comment not found.");
                }

                // Check if user owns the comment or is admin
                if (comment.UserId != userId && userRole != "Admin")
                {
                    return Forbid("You can only delete your own comments or be an admin.");
                }

                db.ProductComments.Remove(comment);
                await db.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}