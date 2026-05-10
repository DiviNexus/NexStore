import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/myorders", {
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

  if (orders.length === 0) {
    return <p className="mt-4">You haven’t placed any orders yet.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      <table className="table table-striped">
        <thead>
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
                {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
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
