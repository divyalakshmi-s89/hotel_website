/**
 * Food availability checker based on IST (India Standard Time)
 * Opening Hours: 7:00 AM – 10:00 PM
 * Breakfast: 7:00 AM – 11:00 AM
 * Lunch:    12:00 PM –  4:00 PM
 * Dinner:    6:00 PM – 10:00 PM
 */

export function getISTTime() {
  // Get current UTC time then add 5h30m for IST
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  return {
    hours: ist.getHours(),
    minutes: ist.getMinutes(),
    totalMinutes: ist.getHours() * 60 + ist.getMinutes(),
  };
}

export function isHotelOpen() {
  const { totalMinutes } = getISTTime();
  const open  = 7 * 60;   // 7:00 AM
  const close = 22 * 60;  // 10:00 PM
  return totalMinutes >= open && totalMinutes < close;
}

// Returns which menu tab is currently available
export function getAvailableMenus() {
  const { totalMinutes } = getISTTime();
  return {
    breakfast: totalMinutes >= 7 * 60  && totalMinutes < 11 * 60,  // 7–11 AM
    lunch:     totalMinutes >= 12 * 60 && totalMinutes < 16 * 60,  // 12–4 PM
    dinner:    totalMinutes >= 18 * 60 && totalMinutes < 22 * 60,  // 6–10 PM
  };
}

export function getHotelStatus() {
const { totalMinutes } = getISTTime();
  const open  = 7 * 60;
  const close = 22 * 60;

  if (totalMinutes >= open && totalMinutes < close) {
    const remaining = close - totalMinutes;
    const rh = Math.floor(remaining / 60);
    const rm = remaining % 60;
    return {
      isOpen: true,
      message: `🟢 We're Open · Closes at 10:00 PM${rh > 0 ? ` (${rh}h ${rm}m left)` : ` (${rm}m left)`}`,
    };
  } else {
    // Next opening
    let nextOpen = '';
    if (totalMinutes < open) {
      const diff = open - totalMinutes;
      const dh = Math.floor(diff / 60);
      const dm = diff % 60;
      nextOpen = `Opens in ${dh > 0 ? dh + 'h ' : ''}${dm}m`;
    } else {
      nextOpen = 'Opens tomorrow at 7:00 AM';
    }
    return {
      isOpen: false,
      message: `🔴 Currently Closed · ${nextOpen}`,
    };
  }
}
