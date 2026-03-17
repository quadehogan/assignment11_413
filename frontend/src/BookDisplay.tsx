import type { Book } from "./types/Book";
import { useState, useEffect } from "react";

function BookDisplay() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    // sortOrder: "asc" = A→Z, "desc" = Z→A, "" = no sort
    const [sortOrder, setSortOrder] = useState<string>("");

    const totalPages = Math.ceil(totalBooks / pageSize);

    // Re-fetch whenever page, page size, or sort order changes
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5000/api/Books/AllBooks?pageNumber=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}`
            );
            const data = await response.json();
            setTotalBooks(data.totalBooks);
            setBooks(data.allBooks);
        };

        fetchBooks();
    }, [pageSize, currentPage, sortOrder]);

    // Toggle between asc → desc → no sort on each click
    const handleSortToggle = () => {
        if (sortOrder === "") setSortOrder("asc");
        else if (sortOrder === "asc") setSortOrder("desc");
        else { setSortOrder(""); }
        // Reset to first page so the sorted results start from the beginning
        setCurrentPage(0);
    };


  return (
    <>
      <h2 className="mb-3">Book List</h2>

      {/* Sort button — cycles through: no sort → A→Z → Z→A → no sort */}
      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={handleSortToggle}>
          Sort by Title{" "}
          {sortOrder === "asc" ? "A→Z" : sortOrder === "desc" ? "Z→A" : ""}
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book) => (
          <div key={book.bookID} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <ul className="list-unstyled mb-0">
                  <li><strong>Publisher:</strong> {book.publisher}</li>
                  <li><strong>ISBN:</strong> {book.isbn}</li>
                  <li><strong>Classification:</strong> {book.classification}</li>
                  <li><strong>Category:</strong> {book.category}</li>
                  <li><strong>Pages:</strong> {book.pageCount}</li>
                  <li><strong>Price:</strong> ${book.price.toFixed(2)}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container d-flex align-items-center gap-2 my-3 flex-wrap">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          &laquo; Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn ${i === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Next &raquo;
        </button>

        <label className="d-flex align-items-center gap-2 ms-auto mb-0">
          Results per page:
          <select
            className="form-select form-select-sm w-auto"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(0); }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  )
}

export default BookDisplay