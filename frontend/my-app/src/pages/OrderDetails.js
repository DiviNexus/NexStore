import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";

const OrderDetails = () => {
  const { id } = useParams(); // order ID from URL
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching order details");
      }
    };

    fetchOrder();
  }, [id]);

  // Mark order as paid
  const markPaid = async () => {
    try {
      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        {
          id: "PAYMENT123",
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          email_address: "customer@example.com",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrder(data.order || data); // handle both response formats
      setSuccess("Order marked as paid successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error marking order as paid");
    }
  };

  // Mark order as delivered
  const markDelivered = async () => {
    try {
      const { data } = await axios.put(
        `/api/orders/${id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrder(data.order || data);
      setSuccess("Order marked as delivered successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error marking order as delivered");
    }
  };

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Order Details</h2>

      {/* Show error or success messages */}
      {error && <Message type="danger">{error}</Message>}
      {success && <Message type="success">{success}</Message>}

      <p><strong>ID:</strong> {order._id}</p>
      <p><strong>Total:</strong> ₹{order.totalPrice}</p>
      <p>
        <strong>Status:</strong>{" "}
        {order.isPaid ? (
          <span className="badge bg-primary">Paid</span>
        ) : (
          <span className="badge bg-secondary">Not Paid</span>
        )}{" "}
        |{" "}
        {order.isDelivered ? (
          <span className="badge bg-success">Delivered</span>
        ) : (
          <span className="badge bg-warning text-dark">Not Delivered</span>
        )}
      </p>

      <h4>Items:</h4>
      <ul className="list-group mb-3">
        {order.orderItems.map((item) => (
          <li key={item._id} className="list-group-item">
            {item.name} - ₹{item.price} x {item.quantity}
          </li>
        ))}
      </ul>

      {/* Show Pay button if not paid */}
      {!order.isPaid && (
        <button className="btn btn-success mt-3" onClick={markPaid}>
          Pay Now
        </button>
      )}

      {/* Show Deliver button if paid but not delivered */}
      {order.isPaid && !order.isDelivered && (
        <button className="btn btn-primary mt-3" onClick={markDelivered}>
          Mark Delivered (Admin only)
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
