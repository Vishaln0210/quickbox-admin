import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/OrderManagement.css'; // Import CSS for OrderManagement

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <p>Manage your orders here.</p>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total Amount</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Contact</th>
         
           
             
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.totalAmount}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.contactNumber}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;