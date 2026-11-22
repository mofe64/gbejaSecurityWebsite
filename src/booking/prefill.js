// A service page can pick the service (and package) before opening the booking page.
let pending = null;

export const setBookingPrefill = (prefill) => {
  pending = prefill;
};

export const takeBookingPrefill = () => {
  const p = pending;
  pending = null;
  return p;
};
