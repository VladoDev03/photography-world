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
        private readonly ILikeService likeService;

        public UserController(
            IUserServices userServices,
            IPictureServices pictureServices,
            ILikeService likeService)
        {
            this.userServices = userServices;
            this.pictureServices = pictureServices;
            this.likeService = likeService;
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
                Pictures = userPictures
                    .Select(x =>
                    {
                        PictureViewModel viewModel = x.ToViewModel();
                        viewModel.LikesCount = likeService.PictureLikes(viewModel.Id).Count;

                        return viewModel;
                    }).ToList()
            };

            return new JsonResult(result);
        }
    }
}
