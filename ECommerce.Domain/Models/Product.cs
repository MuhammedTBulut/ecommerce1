
namespace ECommerce.Domain.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }  =null!;     
    public string Description { get; set; } =null!;
    public decimal Price { get; set; }
    public int Stock { get; set; }

    public int CategoryId { get; set; }
    public string ImageUrl { get; set; } = null!;
    
    public Category Category { get; set; } = null!;

    public ICollection<ProductComment> Comments { get; set; }=null!;
}
