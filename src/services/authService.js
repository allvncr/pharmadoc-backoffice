import axios from "axios";
import domain from "@/environment";

export const login = async (email, password) => {
  return await axios.post(domain + "/users/auth", { email, password });
};

export const register = async (userData) => {
  return await axios.post(domain + "/users", userData);
};

export const updateUser = async (token, userData) => {
  const url = domain + (userData.id ? "/users/" + userData.id : "/users/me");

  return axios.patch(
    url,
    {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllUsers = async (token) => {
  return await axios.get(domain + "/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserByID = async (token, userData) => {
  return await axios.patch(domain + "/auth/users/" + userData.id, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserByID = async (token, ID) => {
  return await axios.delete(domain + "/auth/users/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
