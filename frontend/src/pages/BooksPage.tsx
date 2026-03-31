import { useState, useEffect } from "react";

import type { Book } from "../types/Book";

import { deleteBook, fetchBooks } from "../api/ProjectAPICalls";

import BookGrid from "../components/BookGrid";
import Pagination from "../components/Pagination";
import SortButton from "../components/SortButton";
import CategoryFilter from "../components/CategoryFilter";
import CartSummary from "../components/CartSummary";
import Banner from "../components/Banner";
import NewBookForm from "../components/AddBook";
import UpdateBookForm from "../components/UpdateBook";


function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error , setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const totalPages = Math.ceil(totalBooks / pageSize);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategories]);

  useEffect(() => {
    const loadBooks= async () => {
      try{
        const data = await fetchBooks(pageSize, currentPage, sortOrder, selectedCategories);
        setTotalBooks(data.totalBooks);
        setBooks(data.allBooks);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, currentPage, sortOrder, selectedCategories]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await deleteBook(bookID);
        setBooks(book => book.filter(b => b.bookID !== bookID));
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const handleSortToggle = () => {
    if (sortOrder === "") setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder("");
    setCurrentPage(0);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  return (
    <div className="container-fluid px-4">
      <CartSummary />

      {/* Banner */}
      <div className="row">
        <div className="col-12">
          <Banner />
        </div>
      </div>

      <button
        className="btn btn-success mb-3"
        onClick={() => setShowForm(true)}>
        + Add New Book
      </button>

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, currentPage, sortOrder, []).then((data) => setBooks(data.allBooks));
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <UpdateBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, currentPage, sortOrder, []).then((data) => setBooks(data.allBooks));
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      {(showForm || !!editingBook) && <div className="modal-backdrop show"></div>}

      {/* Toolbar */}
      <div className="row mb-3">
        <div className="col d-flex align-items-center justify-content-between">
          <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          <SortButton sortOrder={sortOrder} onToggle={handleSortToggle} />
        </div>
      </div>

      {/* Book grid */}
      <div className="row">
        <div className="col-12">
          <BookGrid books={books} onDelete={handleDelete} onEdit={setEditingBook} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
