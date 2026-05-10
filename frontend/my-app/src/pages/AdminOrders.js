import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Error fetching orders");
      }
    };
    fetchOrders();
  }, []);

  const markDelivered = async (id) => {
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
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? data.order || data : order))
      );
      setSuccess("Order marked as delivered successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error marking order as delivered");
    }
  };

  if (orders.length === 0) {
    return <Message type="info">No orders found.</Message>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Dashboard - Orders</h2>

      {/* Show error or success messages */}
      {error && <Message type="danger">{error}</Message>}
      {success && <Message type="success">{success}</Message>}

      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || "Unknown"}</td>
              <td>₹{order.totalPrice}</td>
              <td>
                {order.isDelivered ? (
                  <span className="badge bg-success">Delivered</span>
                ) : order.isPaid ? (
                  <span className="badge bg-primary">Paid</span>
                ) : (
                  <span className="badge bg-secondary">Pending</span>
                )}
              </td>
              <td>
                <Link to={`/order/${order._id}`} className="btn btn-primary btn-sm">
                  View
                </Link>
              </td>
              <td>
                {order.isPaid && !order.isDelivered && (
                  <button
                    className="btn btn-success btn-sm mx-2"
                    onClick={() => markDelivered(order._id)}
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
