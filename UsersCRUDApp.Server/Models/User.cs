using System.ComponentModel.DataAnnotations;

namespace UsersCRUDApp.Server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public string? City { get; set; }
    }
}
