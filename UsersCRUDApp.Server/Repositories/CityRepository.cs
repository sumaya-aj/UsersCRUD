using Microsoft.EntityFrameworkCore;
using UsersCRUDApp.Server.Common.UserFriendlyExceptions;
using UsersCRUDApp.Server.DTOs;
using UsersCRUDApp.Server.Models;
using UsersCRUDApp.Server.Repositories.interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace UsersCRUDApp.Server.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly UsersDbContext _dbContext;

        public CityRepository(UsersDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public IEnumerable<CityDTO> GetAll()
        {
            return _dbContext.Cities
                .Select(city => new CityDTO
                {
                    Id = city.Id,
                    Name = city.Name
                })
                .ToList();
        }
    }
}
