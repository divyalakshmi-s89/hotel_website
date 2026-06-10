import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('jeya_admin_token') || '');
  const [secret, setSecret] = useState('');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.adminLogin(secret);

    if (res.success) {
      setToken(res.token);
      localStorage.setItem('jeya_admin_token', res.token);
      toast.success('Logged in successfully!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('jeya_admin_token');
    setOrders([]);
    setStats(null);
  };

  // ✅ FIXED: single clean fetch function inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        setLoading(true);

        const [ordersRes, statsRes] = await Promise.all([
          api.getOrders(token),
          api.getDailySales(token)
        ]);

        if (ordersRes.success) setOrders(ordersRes.orders);
        if (statsRes.success) setStats(statsRes);

      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const updateStatus = async (id, status) => {
    const res = await api.updateOrderStatus(token, id, status);

    if (res.success) {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );
      toast.success('Status updated!');
    } else {
      toast.error('Failed to update status');
    }
  };

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
          <h2>Admin Login</h2>
          <p>Jeya Hotel Management Panel</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Admin Secret Key</label>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter admin secret"
                required
              />
            </div>

            <button type="submit" className="submit-order-btn">
              🔓 Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🍛 Jeya Hotel – Admin Dashboard</h1>

        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <button onClick={() => window.location.reload()} className="nav-cart-btn">
            🔄 Refresh
          </button>

          <button
            onClick={logout}
            style={{
              background: '#e53e3e',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: 50,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-num">{stats.totalOrders}</div>
            <div className="stat-label">Today's Orders</div>
          </div>

          <div className="stat-card">
            <div className="stat-num">₹{stats.totalRevenue}</div>
            <div className="stat-label">Today's Revenue</div>
          </div>

          <div className="stat-card">
            <div className="stat-num" style={{ color: '#F9A825' }}>
              {stats.pendingOrders}
            </div>
            <div className="stat-label">Pending Orders</div>
          </div>

          <div className="stat-card">
            <div className="stat-num" style={{ color: '#2E7D32' }}>
              {stats.deliveredOrders}
            </div>
            <div className="stat-label">Delivered Today</div>
          </div>
        </div>
      )}

      {/* ORDERS TABLE */}
      <div className="orders-table-wrap">
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
          📋 All Orders
        </h3>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>
            No orders found
          </p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {new Date(order.orderDate).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'short',
                      timeStyle: 'short'
                    })}
                  </td>

                  <td>
                    <strong>{order.customerName}</strong>
                    <br />
                    <small style={{ color: 'var(--text-light)' }}>
                      {order.address?.slice(0, 40)}
                    </small>
                  </td>

                  <td>
                    <a href={`tel:${order.mobileNumber}`}>
                      {order.mobileNumber}
                    </a>
                  </td>

                  <td>
                    {order.items?.map((i) => `${i.name}×${i.quantity}`).join(', ')}
                  </td>

                  <td>
                    <strong>₹{order.totalAmount}</strong>
                    <br />
                    <small>Del: ₹{order.deliveryCharge}</small>
                  </td>

                  <td>
                    <span
                      className={`status-badge status-${order.orderStatus?.replace(
                        / /g,
                        '-'
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      style={{
                        padding: '0.3rem',
                        borderRadius: 6,
                        border: '1px solid #ddd',
                        fontSize: '0.8rem'
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}