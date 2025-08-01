using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Domain.Models
{
    public class Role
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    
  
    public ICollection<User> Users { get; set; } = new List<User>();
}
}