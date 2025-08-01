using Microsoft.EntityFrameworkCore;
using ECommerce.Domain.Models;

namespace ECommerce.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<ProductComment> ProductComments => Set<ProductComment>();
    public DbSet<PaymentInfo> PaymentInfos => Set<PaymentInfo>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<SupportTicket> SupportTickets => Set<SupportTicket>();
    public DbSet<AppSetting> AppSettings => Set<AppSetting>();
    public DbSet<ActionLog> ActionLogs => Set<ActionLog>();
    public DbSet<Role> Roles { get; set; }
}
