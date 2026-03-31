using LibraryApp.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// OpenAPI / Swagger
builder.Services.AddOpenApi();

// Entity Framework Core with SQLite
builder.Services.AddDbContext<LibraryDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("LibraryConnection"))
);

// CORS — allow the React dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
