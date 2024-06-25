using Microsoft.EntityFrameworkCore;
using UsersCRUDApp.Server.Models;
using UsersCRUDApp.Server.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddTransient<IOurHeroService, OurHeroService>();
builder.Services.AddDbContext<UsersDbContext>(db => db.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
