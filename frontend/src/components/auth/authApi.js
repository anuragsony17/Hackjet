import axios from "axios";

const API_URL = "http://localhost:8080";

// SIGNUP
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    console.log(userData);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData, {
        withCredentials: true,
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error.response?.data || error.message);
    }
  });
}

// LOGIN
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginInfo, {
        withCredentials: true,
      });
      resolve({ data: response.data });
      console.log({data : response.data })
    } catch (error) {
      reject(error.response?.data || error.message);
    }
  });
}

// CHECK AUTH
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_URL}/auth/check`, {
        withCredentials: true,
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error.response?.data || error.message);
    }
  });
}

// LOGOUT
export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
      resolve({ data: "success" });
    } catch (error) {
      reject(error.response?.data || error.message);
    }
  });
}

// RESET PASSWORD REQUEST
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password-request`,
        { email },
        { withCredentials: true }
      );
      resolve({ data: response.data });
    } catch (error) {
      reject(error.response?.data || error.message);
    }
  });
}

// RESET PASSWORD
export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password`,
        data,
        { withCredentials: true }
      );
      resolve({ data: response.data });
    } catch (error) {
      reject(error.response?.data || error.message);
    }
  });
}
