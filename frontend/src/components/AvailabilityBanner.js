import React, { useState, useEffect } from 'react';
import { getHotelStatus } from '../utils/availability';

export default function AvailabilityBanner() {
  const [status, setStatus] = useState(getHotelStatus());

  useEffect(() => {
    // Update every minute
    const timer = setInterval(() => setStatus(getHotelStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`availability-banner ${status.isOpen ? 'open' : 'closed'}`}>
      <span className="availability-dot" />
      <span>{status.message}</span>
    </div>
  );
}
