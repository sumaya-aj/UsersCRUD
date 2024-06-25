using UsersCRUDApp.Server.DTOs;

namespace UsersCRUDApp.Server.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> GetUserByIdAsync(int id);
        Task AddUserAsync(UserDTO userDto);
        Task UpdateUserAsync(UserDTO userDto);
        Task DeleteUserAsync(int id);
    }
}
