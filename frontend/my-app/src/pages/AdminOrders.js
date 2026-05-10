import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching orders");
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
    } catch (error) {
      console.error(error);
      alert("Error marking order as delivered");
    }
  };

  if (orders.length === 0) {
    return <p className="mt-4">No orders found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard - Orders</h2>
      <table className="table table-striped">
        <thead>
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
                {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
              </td>
              <td>
                <Link to={`/order/${order._id}`} className="btn btn-primary btn-sm">
                  View
                </Link>
              </td>
              <td>
                {order.isPaid && !order.isDelivered && (
                  <button
                    className="btn btn-success btn-sm"
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
