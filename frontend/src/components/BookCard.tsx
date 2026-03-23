import { useState, useRef } from "react";
import type { Book } from "../types/Book";
import { useCart } from "../context/CartContext";
import ToastNotification from "./ToastNotification";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddToCart = () => {
    addToCart({ bookId: book.bookID, title: book.title, bookCost: book.price, quantity: 1 });
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowToast(true);
    timerRef.current = setTimeout(() => setShowToast(false), 2000);
  };

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
        <div className="card-footer">
          <button className="btn btn-primary w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <ToastNotification message={`"${book.title}" added to cart`} show={showToast} />
    </div>
  );
}

export default BookCard;
