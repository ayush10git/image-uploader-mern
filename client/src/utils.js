import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (accessToken) => {
  if (!accessToken) return null;

  try {
    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken._id;
    return userId;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return null;
  }
};
