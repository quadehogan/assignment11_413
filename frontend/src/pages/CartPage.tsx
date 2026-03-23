import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Banner from "../components/Banner";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.bookCost * item.quantity, 0);

  return (
    <>
      <Banner />
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.bookId} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-title">{item.title}</span>
                  <span className="cart-item-details">
                    ${item.bookCost.toFixed(2)} &times; {item.quantity} = ${(item.bookCost * item.quantity).toFixed(2)}
                  </span>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.bookId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-footer">
          <span className="cart-total">Total: ${total.toFixed(2)}</span>
          <div className="cart-actions">
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              Continue Browsing
            </button>
            <button className="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
