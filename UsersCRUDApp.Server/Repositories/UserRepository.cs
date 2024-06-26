﻿using Microsoft.EntityFrameworkCore;
using UsersCRUDApp.Server.Common.UserFriendlyExceptions;
using UsersCRUDApp.Server.DTOs;
using UsersCRUDApp.Server.Models;
using UsersCRUDApp.Server.Repositories.interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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
                    CityId = userDto.CityId
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

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync(string? searchString)
        {

            IQueryable<User> users = _dbContext.Users.Include(u => u.City);
            if (!String.IsNullOrEmpty(searchString))
            {
                users = users.Where(u => u.FullName.Contains(searchString)
                                       || u.Email.Contains(searchString)
                                       || (u.City != null && u.City.Name.Contains(searchString)));
            }

            return await users
                .Select(user => new UserDTO
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    BirthDate = user.BirthDate,
                    CityId = user.CityId,
                    CityName = user.City != null ? user.City.Name : string.Empty
                })
                .ToListAsync();
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _dbContext.Users
                                      .Include(u => u.City)
                                      .FirstOrDefaultAsync(u => u.Id == id);

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
                CityId = user.CityId,
                CityName = user.City != null ? user.City.Name : string.Empty
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
                user.CityId = userDto.CityId;

                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
