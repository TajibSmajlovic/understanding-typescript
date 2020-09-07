export const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

export const API_ENDPOINTS = {
  GOOGLE_MAPS_URL: (enteredAddress: string) =>
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      enteredAddress
    )}&key=${GOOGLE_API_KEY}`,
};
