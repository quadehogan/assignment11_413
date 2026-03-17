using LibraryApp.Api.Data;
using LibraryApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public BooksController(LibraryDbContext context)
    {
        _context = context;
    }
    
    [HttpGet("AllBooks")]
    // sortOrder: "asc" sorts A→Z, "desc" sorts Z→A, anything else returns unsorted
    public IActionResult GetBooks(int pageSize = 10, int pageNumber = 0, string sortOrder = "")
    {
        // Start with the full books query
        var query = _context.Books.AsQueryable();

        // Apply sorting by title before pagination so each page reflects the correct order
        query = sortOrder switch
        {
            "asc" => query.OrderBy(b => b.Title),
            "desc" => query.OrderByDescending(b => b.Title),
            _ => query // no sort — return in default DB order
        };

        var skipCalc = pageNumber * pageSize;
        var allBooks = query
            .Skip(skipCalc)
            .Take(pageSize)
            .ToList();

        var totalBooks = _context.Books.Count();

        return Ok(new
        {
            allBooks,
            totalBooks
        });
    }
}
