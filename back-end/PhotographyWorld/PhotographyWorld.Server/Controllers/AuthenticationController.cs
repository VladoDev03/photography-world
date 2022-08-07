using Microsoft.AspNetCore.Mvc;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Server.BindingModels.User;
using PhotographyWorld.Services.Contracts;
using PhotographyWorld.Services.Models;

namespace PhotographyWorld.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IUserServices userServices;

        public AuthenticationController(
            IConfiguration configuration,
            IUserServices userServices)
        {
            this.configuration = configuration;
            this.userServices = userServices;
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
            string errorMessage = "Wrong username or password";

            if (!userServices.IsExisting(request.Username))
            {
                return BadRequest(new { Message = errorMessage });
            }

            User user = userServices.GetByUsername(request.Username);

            if (!userServices.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest(new { Message = errorMessage });
            }

            string token = configuration.GetSection("AppSettings:Token").Value;

            string generatedToken = userServices.CreateToken(user, token);

            return Ok(new { Token = generatedToken, User = user });
        }
    }
}
