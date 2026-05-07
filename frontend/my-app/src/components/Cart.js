import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="card p-3 mb-2">
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
