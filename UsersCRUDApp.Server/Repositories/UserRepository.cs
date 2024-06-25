using Microsoft.EntityFrameworkCore;
using UsersCRUDApp.Server.Common.UserFriendlyExceptions;
using UsersCRUDApp.Server.DTOs;
using UsersCRUDApp.Server.Models;

namespace UsersCRUDApp.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UsersDbContext _dbContext;

        public UserRepository(UsersDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddUserAsync(UserDTO userDto)
        {
            await _dbContext.Users.AddAsync(
                new User { 
                    Id = userDto.Id, 
                    FullName = userDto.FullName,
                    Email = userDto.Email,
                    BirthDate = userDto.BirthDate,
                    City = userDto.City
                }
            );
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user != null)
            {
                _dbContext.Users.Remove(user);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            return await _dbContext.Users.
                Select(userDto => new UserDTO { 
                    Id = userDto.Id,
                    FullName = userDto.FullName,
                    Email = userDto.Email, 
                    BirthDate = userDto.BirthDate, 
                    City = userDto.City
                }).ToListAsync();
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);

            if (user == null)
            {
                throw new NotFoundException($"User with id {id} not found.");
            }

            return new UserDTO
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                BirthDate = user.BirthDate,
                City = user.City
            };
        }

        public async Task UpdateUserAsync(UserDTO userDto)
        {
            var user = await _dbContext.Users.FindAsync(userDto.Id);

            if (user != null)
            {
                user.FullName = userDto.FullName;
                user.Email = userDto.Email;
                user.BirthDate = userDto.BirthDate;
                user.City = userDto.City;

                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
