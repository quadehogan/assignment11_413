import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Banner from "../components/Banner";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.bookCost * item.quantity, 0);

  return (
    <>
        <Banner />
        <div>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
            <p>Your cart is empty</p>
        ) : (
            <ul>
            {cart.map((item) => (
                <li key={item.bookId}>
                {item.title} — ${item.bookCost.toFixed(2)} x {item.quantity}
                <button onClick={() => removeFromCart(item.bookId)}>Remove</button>
                </li>
            ))}
            </ul>
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
        <button>Checkout</button>
        <button onClick={() => navigate(-1)}>Continue Browsing</button>
        </div>
    </>
  );
}

export default CartPage;
