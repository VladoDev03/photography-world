using PhotographyWorld.Data.ConfigurationModels;

var builder = WebApplication.CreateBuilder(args);

const string AllowedSpecificOrigins = "AllowedPolicies";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

CloudinaryConfigurationModel cloudinaryConfiguration = builder
                .Configuration
                .GetSection("CloudinaryConfiguration")
                .Get<CloudinaryConfigurationModel>();

builder.Services.AddSingleton(cloudinaryConfiguration);

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

app.MapControllers();

app.Run();
