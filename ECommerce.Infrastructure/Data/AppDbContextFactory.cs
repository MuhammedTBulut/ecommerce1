using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using ECommerce.Infrastructure.Data;

namespace ECommerce.Infrastructure.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // PostgreSQL bağlantı cümlesi — design time için hardcoded olabilir
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=e_commercedb;Username=postgres;Password=1234");

        return new AppDbContext(optionsBuilder.Options);
    }
}