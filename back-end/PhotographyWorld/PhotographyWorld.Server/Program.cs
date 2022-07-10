using Microsoft.EntityFrameworkCore;
using PhotographyWorld.Data;
using PhotographyWorld.Data.ConfigurationModels;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services;
using PhotographyWorld.Services.Contracts;

var builder = WebApplication.CreateBuilder(args);

const string AllowedSpecificOrigins = "AllowedPolicies";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

CloudinaryConfigurationModel cloudinaryConfiguration = builder
                .Configuration
                .GetSection("CloudinaryConfiguration")
                .Get<CloudinaryConfigurationModel>();

builder.Services.AddDbContext<GalleryDbContext>(options =>
{
    string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

builder.Services.AddSingleton(cloudinaryConfiguration);
builder.Services.AddScoped<IPictureServices, PictureServices>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(AllowedSpecificOrigins);

SeedDatabase(app.Services);

app.MapControllers();

app.Run();

void SeedDatabase(IServiceProvider serviceCollection)
{
    using (var serviceScope = serviceCollection.CreateScope())
    {
        using (var ideaDbContext = serviceScope.ServiceProvider.GetService<GalleryDbContext>())
        {
            if (!ideaDbContext.Pictures.Any())
            {
                ideaDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://www.nme.com/wp-content/uploads/2022/07/Thor_Love_And_Thunder-1.jpg",
                    Description = "This is a picture from Thor Love and Thunder"
                });
                ideaDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://i.redd.it/sq9lfbthd7c31.png",
                    Description = "This is a picture from Doctor Strange in the Multiverse of Madness"
                });
                ideaDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/R.d8ae7705579c67e767d46a43787f0f4a?rik=45NToZV%2bnTuTUw&pid=ImgRaw&r=0",
                    Description = "This is a picture from Top Gun Maverick"
                });
                ideaDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/R.29e11be2064894341e5893d8d1db5aec?rik=KJsAh%2bBazDf4IQ&pid=ImgRaw&r=0",
                    Description = "This is a picture from Morbius"
                });
                ideaDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/R.30fc03d5aca33081700abd40003c515c?rik=kjJXiZeiCTk0jQ&pid=ImgRaw&r=0",
                    Description = "This is a picture from Jurassic World Dominion"
                });
                ideaDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://th.bing.com/th/id/OIP.aLMcp3QAZ07XdbnhiB7YdAHaEG?pid=ImgDet&rs=1",
                    Description = "This is a picture from Sonic the Hedgehog 2"
                });
                ideaDbContext.Pictures.Add(new Picture()
                {
                    Url = "https://simkl.in/fanart/11/1144769496e174c9d4_medium.jpg",
                    Description = "This is a picture from The Batman"
                });

                ideaDbContext.SaveChanges();
            }
        }
    }
}