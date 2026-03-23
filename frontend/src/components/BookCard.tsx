import type { Book } from "../types/Book";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <div className="col">
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
  );
}

export default BookCard;
