using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PhotographyWorld.Data;
using PhotographyWorld.Data.ConfigurationModels;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services;
using PhotographyWorld.Services.Contracts;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

const string AllowedSpecificOrigins = "AllowedPolicies";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

CloudinaryConfigurationModel cloudinaryConfiguration = builder
                .Configuration
                .GetSection("CloudinaryConfiguration")
                .Get<CloudinaryConfigurationModel>();

builder.Services.AddDbContext<GalleryDbContext>(options =>
{
    string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseNpgsql(connectionString);
});

builder.Services.AddSingleton(cloudinaryConfiguration);
builder.Services.AddScoped<IPictureServices, PictureServices>();
builder.Services.AddScoped<ICloudinaryServices, CloudinaryServices>();
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<ILikeService, LikeService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedSpecificOrigins,
                      policy =>
                      {
                          policy
                            .WithOrigins("https://photography-world-81449.web.app")
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                      });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors(AllowedSpecificOrigins);

SeedDatabase(app.Services);

app.MapControllers();

app.Run();

void SeedDatabase(IServiceProvider serviceCollection)
{
    using (var serviceScope = serviceCollection.CreateScope())
    {
        using (var galleryDbContext = serviceScope.ServiceProvider.GetService<GalleryDbContext>())
        {
            if (!galleryDbContext.Users.Any())
            {
                galleryDbContext.Users.Add(new User()
                {
                    Username = "name",
                    Email = "email",
                    Id = "123",
                    PasswordHash = new byte[1],
                    PasswordSalt = new byte[1]
                });
            }

            if (!galleryDbContext.Pictures.Any())
            {
                galleryDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://www.nme.com/wp-content/uploads/2022/07/Thor_Love_And_Thunder-1.jpg",
                    Description = "This is a picture from Thor Love and Thunder",
                    DownloadUrl = "123",
                    PublicId = "123",
                    UserId = "123",
                    IsDownloadable = true
                });
                galleryDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://i.redd.it/sq9lfbthd7c31.png",
                    Description = "This is a picture from Doctor Strange in the Multiverse of Madness",
                    DownloadUrl = "123",
                    PublicId = "123",
                    UserId = "123",
                    IsDownloadable = true
                });
                galleryDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/R.d8ae7705579c67e767d46a43787f0f4a?rik=45NToZV%2bnTuTUw&pid=ImgRaw&r=0",
                    Description = "This is a picture from Top Gun Maverick",
                    DownloadUrl = "123",
                    PublicId = "123",
                    UserId = "123",
                    IsDownloadable = true
                });
                galleryDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/R.29e11be2064894341e5893d8d1db5aec?rik=KJsAh%2bBazDf4IQ&pid=ImgRaw&r=0",
                    Description = "This is a picture from Morbius",
                    DownloadUrl = "123",
                    PublicId = "123",
                    UserId = "123",
                    IsDownloadable = true
                });
                galleryDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/R.30fc03d5aca33081700abd40003c515c?rik=kjJXiZeiCTk0jQ&pid=ImgRaw&r=0",
                    Description = "This is a picture from Jurassic World Dominion",
                    DownloadUrl = "123",
                    PublicId = "123",
                    UserId = "123",
                    IsDownloadable = true
                });
                galleryDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/OIP.aLMcp3QAZ07XdbnhiB7YdAHaEG?pid=ImgDet&rs=1",
                    Description = "This is a picture from Sonic the Hedgehog 2",
                    DownloadUrl = "123",
                    PublicId = "123",
                    UserId = "123",
                    IsDownloadable = true
                });
                galleryDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://simkl.in/fanart/11/1144769496e174c9d4_medium.jpg",
                    Description = "This is a picture from The Batman",
                    DownloadUrl = "123",
                    PublicId = "123",
                    UserId = "123",
                    IsDownloadable = true
                });

                galleryDbContext.SaveChanges();
            }
        }
    }
}