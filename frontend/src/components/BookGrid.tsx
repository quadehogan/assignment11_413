import type { Book } from "../types/Book";
import BookCard from "./BookCard";

interface BookGridProps {
  books: Book[];
  onDelete: (bookID: number) => void;
  onEdit: (book: Book) => void;
}

function BookGrid({ books, onDelete, onEdit }: BookGridProps) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {books.map((book) => (
        <BookCard key={book.bookID} book={book} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default BookGrid;
