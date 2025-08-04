using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ECommerce.Infrastructure.Data;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Models;
using System.Security.Claims;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductCommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductCommentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductComments/{productId}
        [HttpGet("{productId}")]
        public async Task<ActionResult<IEnumerable<ProductCommentDTO>>> GetProductComments(int productId)
        {
            var comments = await _context.ProductComments
                .Where(c => c.ProductId == productId)
                .Include(c => c.User)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new ProductCommentDTO(
                    c.Id,
                    c.Content,
                    c.Rating,
                    c.User.FullName,
                    c.CreatedAt
                ))
                .ToListAsync();

            return Ok(comments);
        }

        // POST: api/ProductComments/{productId}
        [HttpPost("{productId}")]
        [Authorize]
        public async Task<ActionResult<ProductCommentDTO>> CreateComment(int productId, ProductCommentCreateDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get user ID from JWT token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized("Invalid user token.");
            }

            // Check if product exists
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Check if user already commented on this product
            var existingComment = await _context.ProductComments
                .FirstOrDefaultAsync(c => c.ProductId == productId && c.UserId == userId);
            
            if (existingComment != null)
            {
                return BadRequest("You have already commented on this product.");
            }

            var comment = new ProductComment
            {
                ProductId = productId,
                UserId = userId,
                Content = dto.Content,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow
            };

            _context.ProductComments.Add(comment);
            await _context.SaveChangesAsync();

            // Get user info for response
            var user = await _context.Users.FindAsync(userId);
            var commentDto = new ProductCommentDTO(
                comment.Id,
                comment.Content,
                comment.Rating,
                user!.FullName,
                comment.CreatedAt
            );

            return CreatedAtAction(nameof(GetProductComments), new { productId = productId }, commentDto);
        }

        // GET: api/ProductComments/{productId}/stats
        [HttpGet("{productId}/stats")]
        public async Task<ActionResult<object>> GetProductRatingStats(int productId)
        {
            var comments = await _context.ProductComments
                .Where(c => c.ProductId == productId)
                .ToListAsync();

            if (!comments.Any())
            {
                return Ok(new { 
                    averageRating = 0.0,
                    totalComments = 0,
                    ratingDistribution = new { five = 0, four = 0, three = 0, two = 0, one = 0 }
                });
            }

            var averageRating = comments.Average(c => c.Rating);
            var totalComments = comments.Count;
            var ratingDistribution = new
            {
                five = comments.Count(c => c.Rating == 5),
                four = comments.Count(c => c.Rating == 4),
                three = comments.Count(c => c.Rating == 3),
                two = comments.Count(c => c.Rating == 2),
                one = comments.Count(c => c.Rating == 1)
            };

            return Ok(new { 
                averageRating = Math.Round(averageRating, 1),
                totalComments,
                ratingDistribution
            });
        }
    }
}