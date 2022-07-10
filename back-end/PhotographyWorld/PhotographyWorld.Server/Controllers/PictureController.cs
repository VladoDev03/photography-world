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

        [HttpGet("home")]
        public IActionResult AllPictures()
        {
            return new JsonResult(pictureServices.GetAll());
        }
    }
}
