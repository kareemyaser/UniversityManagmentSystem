using Microsoft.EntityFrameworkCore;
using UniversityCRUDApp.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddDbContext<UniversityAppAPIDbContext>(option => option.UseInMemoryDatabase("UniversityDb"));
builder.Services.AddDbContext<UniversityAppAPIDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("UniversityApiConnectionString")));
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Bata",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("Bata");

app.Run();
