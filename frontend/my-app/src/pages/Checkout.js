import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Local state for shipping address & payment method
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      setSuccess("Order placed successfully!");
      setError("");

      // ✅ Redirect to order details page
      navigate(`/order/${data._id}`);
    } catch (err) {
      console.error(err);
      setError("Error placing order");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Checkout</h2>

      {/* Show error or success messages */}
      {error && <Message type="danger">{error}</Message>}
      {success && <Message type="success">{success}</Message>}

      <div className="row">
        {/* Left column: Checkout form */}
        <div className="col-md-6">
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

        {/* Right column: Cart summary */}
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item._id} className="list-group-item">
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <div className="card p-3">
            <h5>Total: ₹{totalPrice}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
