using UsersCRUDApp.Server.DTOs;

namespace UsersCRUDApp.Server.Repositories.interfaces
{
    public interface ICityRepository
    {
        IEnumerable<CityDTO> GetAll();
    }
}
