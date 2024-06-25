using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UsersCRUDApp.Server.Common.UserFriendlyExceptions;
using UsersCRUDApp.Server.DTOs;
using UsersCRUDApp.Server.Repositories;

namespace UsersCRUDApp.Server.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll() {
            var users = await _userRepository.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<UserDTO>> GetById(int id)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                return Ok(user);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] UserDTO userDto)
        {
            if (ModelState.IsValid)
            {
                await _userRepository.AddUserAsync(userDto);
                return Ok(userDto);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UserDTO userDto)
        {
            var user = await _userRepository.GetUserByIdAsync(userDto.Id);
           
            if (user == null) { 
                return NotFound();
            }
        
            await _userRepository.UpdateUserAsync(userDto);
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            await _userRepository.DeleteUserAsync(id);
            return NoContent();
        }

    }
}
