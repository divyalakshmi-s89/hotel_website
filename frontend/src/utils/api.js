const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  async placeOrder(orderData) {
    const res = await fetch(`${API_URL}/api/orders/place`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return res.json();
  },

  async getDeliveryCharge(distance) {
    const res = await fetch(`${API_URL}/api/orders/delivery/charge?distance=${distance}`);
    return res.json();
  },

  async getReviews() {
    const res = await fetch(`${API_URL}/api/reviews`);
    return res.json();
  },

  async submitReview(reviewData) {
    const res = await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    return res.json();
  },

  async submitFestivalOrder(data) {
    const res = await fetch(`${API_URL}/api/festival`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async adminLogin(secret) {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret })
    });
    return res.json();
  },

  async getOrders(token, params = '') {
    const res = await fetch(`${API_URL}/api/admin/orders${params}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  async updateOrderStatus(token, id, status) {
    const res = await fetch(`${API_URL}/api/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async getDailySales(token) {
    const res = await fetch(`${API_URL}/api/admin/sales/daily`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  }
};
