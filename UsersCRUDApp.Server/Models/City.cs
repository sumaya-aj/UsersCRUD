using System.ComponentModel.DataAnnotations;

namespace UsersCRUDApp.Server.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<User> Users { get; } = new List<User>();
    }
}
