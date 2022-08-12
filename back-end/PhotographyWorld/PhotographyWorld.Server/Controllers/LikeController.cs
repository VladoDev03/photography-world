using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services.Contracts;

namespace PhotographyWorld.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService likeServices;

        public LikeController(
            ILikeService likeServices)
        {
            this.likeServices = likeServices;
        }

        [HttpGet("likes/{pictureId}")]
        public IActionResult GetLikes([FromRoute] string pictureId)
        {
            return new JsonResult(likeServices.PictureLikes(pictureId));
        }

        [HttpDelete("likes")]
        public IActionResult RemoveLike([FromBody] Like like)
        {
            likeServices.RemoveLike(like.PictureId, like.UserId);

            return new JsonResult(new {Message = "Like is removed"});
        }

        [HttpPost("likes")]
        public IActionResult LikePicture([FromBody] Like like)
        {
            likeServices.AddLike(like);

            return new JsonResult(like);
        }
    }
}
