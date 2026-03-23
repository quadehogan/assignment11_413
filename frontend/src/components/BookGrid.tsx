import type { Book } from "../types/Book";
import BookCard from "./BookCard";

interface BookGridProps {
  books: Book[];
}

function BookGrid({ books }: BookGridProps) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {books.map((book) => (
        <BookCard key={book.bookID} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
