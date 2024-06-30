using System.ComponentModel.DataAnnotations;

namespace UsersCRUDApp.Server.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }

        [Required]
        public required string FullName { get; set; }
        
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        
        public int? CityId { get; set; }
    }
}
