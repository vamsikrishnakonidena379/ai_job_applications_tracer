export const API_BASE_URL = "http://localhost:5000";

export const getAuthToken = () => localStorage.getItem("token");

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => !!getAuthToken();

export const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getAuthToken()}`
});
