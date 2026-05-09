import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  // Calculate total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item._id} className="card p-3 mb-2">
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <div className="d-flex align-items-center mb-2">
            <button
              className="btn btn-secondary me-2"
              onClick={() => decreaseQuantity(item._id)}
            >
              –
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => increaseQuantity(item._id)}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Show total at the bottom */}
      <div className="card p-3 mt-3">
        <h4>Total: ₹{totalPrice}</h4>
        {/* ✅ Checkout button */}
        <button
          className="btn btn-primary mt-2"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
