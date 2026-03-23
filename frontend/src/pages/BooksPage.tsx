import { useState, useEffect } from "react";
import type { Book } from "../types/Book";
import BookGrid from "../components/BookGrid";
import Pagination from "../components/Pagination";
import SortButton from "../components/SortButton";
import CategoryFilter from "../components/CategoryFilter";
import CartSummary from "../components/CartSummary";
import Banner from "../components/Banner";

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const totalPages = Math.ceil(totalBooks / pageSize);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategories]);

  useEffect(() => {
    const fetchBooks = async () => {

      const categoryParams = selectedCategories.map((cat) => `categories=${encodeURIComponent(cat)}`).join("&");

      const response = await fetch(
        `https://localhost:5000/api/Books/AllBooks?pageNumber=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}&${categoryParams}`
      );
      const data = await response.json();
      setTotalBooks(data.totalBooks);
      setBooks(data.allBooks);
    };

    fetchBooks();
  }, [pageSize, currentPage, sortOrder, selectedCategories]);

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
    <>
      <Banner />
      <SortButton sortOrder={sortOrder} onToggle={handleSortToggle} />

      <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

      <CartSummary />

      <BookGrid books={books} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

    </>
  );
}

export default BooksPage;
