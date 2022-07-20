using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Server.BindingModels;
using PhotographyWorld.Services.Contracts;

namespace PhotographyWorld.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class PictureController : ControllerBase
    {
        private readonly IPictureServices pictureServices;
        private readonly ICloudinaryServices cloudinaryServices;

        public PictureController(
            IPictureServices pictureServices,
            ICloudinaryServices cloudinaryServices)
        {
            this.pictureServices = pictureServices;
            this.cloudinaryServices = cloudinaryServices;
        }

        [HttpGet("pictures")]
        public IActionResult AllPictures()
        {
            return new JsonResult(pictureServices.GetAll());
        }

        [HttpPost("pictures")]
        public async Task<IActionResult> CreatePicture([FromForm] AddPictureBindingModel content)
        {
            if (content.Comment == null)
            {
                return BadRequest(new {Message = "You cannot share an image without a comment." });
            }

            if (content.UserId == null)
            {
                return BadRequest(new { Message = "You have to login in order to share images." });
            }

            if (content.Picture == null)
            {
                return BadRequest(new { Message = "You cannot share empty images." });
            }

            Picture picture = new Picture();
            picture.UserId = content.UserId;

            byte[] data = await cloudinaryServices.GetImageBytes(content.Picture);
            string[] imageData = cloudinaryServices.UploadImage(data, "Photography/Posts").Split("*");

            picture.Url = imageData[0];
            picture.PublicId = imageData[1];
            picture.DownloadUrl = cloudinaryServices.GetDownloadLink(imageData[0]);
            picture.IsDownloadable = true;
            picture.Description = content.Comment;

            return Created("", pictureServices.Create(picture));
        }

        [HttpGet("pictures/{id}")]
        public IActionResult GetPicture(string id)
        {
            if (id == null)
            {
                return BadRequest(new { Message = "Invalid id." });
            }

            return new JsonResult(pictureServices.GetById(id));
        }

        [HttpDelete("pictures/{id}")]
        public IActionResult DeletePicture(string id)
        {
            if (id == null)
            {
                return BadRequest(new { Message = "Invalid id." });
            }

            Picture post = pictureServices.GetById(id);

            pictureServices.Delete(id);

            if (post.PublicId != null)
            {
                cloudinaryServices.DeleteImage(post.PublicId);
            }

            return new JsonResult(new {Message = $"Picture with id: {id} was successfully deleted!"});
        }

        [HttpGet("pictures/user/")]
        public IActionResult GetUserPictures([FromQuery] string userId)
        {
            if (userId == null)
            {
                return BadRequest(new { Message = "Invalid id." });
            }

            return new JsonResult(pictureServices.GetUserPictures(userId));
        }
    }
}
