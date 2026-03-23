import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.bookCost * item.quantity, 0);

  return (
    <div
      onClick={() => navigate("/cart")}
      style={{
        position: "fixed",
        top: "16px",
        right: "24px",
        background: "#ffffff",
        padding: "10px 18px",
        borderRadius: "10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
        fontSize: "15px",
        fontWeight: 500,
        border: "1px solid #dee2e6",
        transition: "box-shadow 0.2s",
        zIndex: 1000,
      }}
    >
      <span style={{ fontSize: "20px" }}>🛒</span>
      <span
        style={{
          background: "#0d6efd",
          color: "#fff",
          borderRadius: "50%",
          width: "22px",
          height: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {itemCount}
      </span>
      <span style={{ color: "#212529" }}>${total.toFixed(2)}</span>
    </div>
  );
};

export default CartSummary;
