using Microsoft.AspNetCore.Mvc;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Data.ViewModels;
using PhotographyWorld.Server.BindingModels.User;
using PhotographyWorld.Services.Contracts;
using PhotographyWorld.Services.Mappers;
using PhotographyWorld.Services.Models;

namespace PhotographyWorld.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserController : ControllerBase
    {
        private readonly IUserServices userServices;
        private readonly IPictureServices pictureServices;
        private readonly IConfiguration configuration;

        public UserController(
            IUserServices userServices,
            IPictureServices pictureServices,
            IConfiguration configuration)
        {
            this.userServices = userServices;
            this.pictureServices = pictureServices;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterUserBindingModel request)
        {
            if (request.Password != request.ConfirmPassword)
            {
                return BadRequest(new { Message = "Passwords must match." });
            }

            if (userServices.IsExisting(request.Username))
            {
                return BadRequest(new { Message = "This user does already exist." });
            }

            User newUser = new User();

            PasswordServiceModel password = userServices.CreatePasswordHash(request.Password);

            newUser.Username = request.Username;
            newUser.PasswordHash = password.Hash;
            newUser.PasswordSalt = password.Salt;
            newUser.Email = "test@subject.now";

            userServices.Create(newUser);

            return Ok(newUser);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUserBindingModel request)
        {
            if (!userServices.IsExisting(request.Username))
            {
                return BadRequest(new { Message = "This user does not exist." });
            }

            User user = userServices.GetByUsername(request.Username);

            if (!userServices.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest(new { Message = "Wrong password." });
            }

            string token = configuration.GetSection("AppSettings:Token").Value;

            string generatedToken = userServices.CreateToken(user, token);

            return Ok(new { Token = generatedToken, User = user });
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
