import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ Redirect to order details page
      navigate(`/order/${data._id}`);
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <p>Total: ₹{totalPrice}</p>
      <button className="btn btn-success" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
