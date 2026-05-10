import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams(); // order ID from URL
  const [order, setOrder] = useState(null);

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
      } catch (error) {
        console.error(error);
        alert("Error fetching order");
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
    } catch (error) {
      console.error(error);
      alert("Error marking order as paid");
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
    } catch (error) {
      console.error(error);
      alert("Error marking order as delivered");
    }
  };

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="container mt-4">
      <h2>Order Details</h2>
      <p><strong>ID:</strong> {order._id}</p>
      <p><strong>Total:</strong> ₹{order.totalPrice}</p>
      <p>
        <strong>Status:</strong>{" "}
        {order.isPaid ? "Paid" : "Not Paid"} |{" "}
        {order.isDelivered ? "Delivered" : "Not Delivered"}
      </p>

      <h4>Items:</h4>
      {order.orderItems.map((item) => (
        <div key={item._id}>
          {item.name} - ₹{item.price} x {item.quantity}
        </div>
      ))}

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
