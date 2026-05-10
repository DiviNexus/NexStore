import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Error fetching your orders");
      }
    };
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <Message type="info">You haven’t placed any orders yet.</Message>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Orders</h2>

      {/* Show error message if any */}
      {error && <Message type="danger">{error}</Message>}

      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
