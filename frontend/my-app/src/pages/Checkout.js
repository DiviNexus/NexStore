import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Local state for shipping address & payment method
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

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
          shippingAddress,
          paymentMethod,
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

      {/* Cart summary */}
      <p>Total: ₹{totalPrice}</p>

      {/* Shipping address input */}
      <div className="mb-3">
        <label className="form-label">Shipping Address</label>
        <input
          type="text"
          className="form-control"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>

      {/* Payment method dropdown */}
      <div className="mb-3">
        <label className="form-label">Payment Method</label>
        <select
          className="form-select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Card</option>
        </select>
      </div>

      {/* Place order button */}
      <button className="btn btn-success" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
