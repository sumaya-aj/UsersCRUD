using System.ComponentModel.DataAnnotations;

namespace UsersCRUDApp.Server.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }

        [Required]
        public required string FullName { get; set; }
        
        [Required]
        public required string Email { get; set; }
        
        public DateTime BirthDate { get; set; }
        
        public string? City { get; set; }
    }
}
