using Microsoft.AspNetCore.Mvc;
using UsersCRUDApp.Server.DTOs;
using UsersCRUDApp.Server.Repositories.interfaces;

namespace UsersCRUDApp.Server.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityRepository _cityRepository;

        public CitiesController(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<CityDTO>> GetAll()
        {
            var cities = _cityRepository.GetAll();
            return Ok(cities);
        }
    }
}
