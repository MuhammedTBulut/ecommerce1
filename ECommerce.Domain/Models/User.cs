namespace ECommerce.Domain.Models;



public class User
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

 public int RoleId { get; set; }
 public Role Role { get; set; } = null!;

    public bool? Gender { get; set; }

    public DateTime? BirthDate { get; set; } // Optional

    public ICollection<Order> Orders { get; set; } = new List<Order>();

    public ICollection<ProductComment> Comments { get; set; } = new List<ProductComment>();

    public ICollection<ActionLog> ActionLogs { get; set; } = new List<ActionLog>();
}