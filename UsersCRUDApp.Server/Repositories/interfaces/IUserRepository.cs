using UsersCRUDApp.Server.DTOs;

namespace UsersCRUDApp.Server.Repositories.interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDTO>> GetAllUsersAsync(string? searchString);
        Task<UserDTO> GetUserByIdAsync(int id);
        Task AddUserAsync(UserDTO userDto);
        Task UpdateUserAsync(UserDTO userDto);
        Task DeleteUserAsync(int id);
    }
}
