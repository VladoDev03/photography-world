using Microsoft.AspNetCore.Mvc;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services.Contracts;

namespace PhotographyWorld.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class PictureController : Controller
    {
        private readonly IPictureServices pictureServices;

        public PictureController(IPictureServices pictureServices)
        {
            this.pictureServices = pictureServices;
        }

        [HttpGet("pictures")]
        public IActionResult AllPictures()
        {
            return new JsonResult(pictureServices.GetAll());
        }

        [HttpPost("pictures")]
        public IActionResult CreatePicture([FromBody] Picture picture)
        {
            return new JsonResult(picture);
        }

        [HttpGet("pictures/{id}")]
        public IActionResult GetPicture(string id)
        {
            return new JsonResult(pictureServices.GetById(id));
        }

        [HttpDelete("pictures/{id}")]
        public IActionResult DeletePicture(string id)
        {
            return new JsonResult(new {Message = $"Picture with id: {id} was successfully deleted!"});
        }
    }
}
