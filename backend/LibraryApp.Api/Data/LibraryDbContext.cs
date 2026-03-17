using LibraryApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.Api.Data;

public class LibraryDbContext : DbContext
{
    public LibraryDbContext(DbContextOptions<LibraryDbContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
}
