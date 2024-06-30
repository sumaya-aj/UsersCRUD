using Microsoft.EntityFrameworkCore;

namespace UsersCRUDApp.Server.Models
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<City> Cities { get; set; }
    }
}
