using Microsoft.AspNetCore.Mvc;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Data.ViewModels;
using PhotographyWorld.Services.Contracts;
using PhotographyWorld.Services.Mappers;

namespace PhotographyWorld.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserController : ControllerBase
    {
        private readonly IUserServices userServices;
        private readonly IPictureServices pictureServices;

        public UserController(
            IUserServices userServices,
            IPictureServices pictureServices)
        {
            this.userServices = userServices;
            this.pictureServices = pictureServices;
        }

        [HttpGet("users/{userId}")]
        public IActionResult GetUser(string userId)
        {
            User user = userServices.GetById(userId);
            List<Picture> userPictures = pictureServices.GetUserPictures(userId);

            UserViewModel result = new UserViewModel()
            {
                Username = user.Username,
                Id = user.Id,
                Pictures = userPictures.Select(x => x.ToViewModel()).ToList()
            };

            return new JsonResult(result);
        }
    }
}
