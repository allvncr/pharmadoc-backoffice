import axios from "axios";
import domain from "@/environment";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();

export const getMedecines = async (searchQuery) => {
  return await axios.get(domain + "/medicine", { params: searchQuery });
};

export const getMedecineById = async (ID) => {
  return await axios.get(domain + "/medicine/" + ID);
};

export const getCategories = async () => {
  return await axios.get(domain + "/categories");
};

export const addMedecines = async (token, userData) => {
  return await axios.post(domain + "/medicine", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMedecineByID = async (token, id, userData) => {
  return await axios.patch(domain + "/medicine/" + id, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMedecineByID = async (token, ID) => {
  return await axios.delete(domain + "/medicine/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteImage = async (token, ID) => {
  return await axios.delete(domain + "/medicine/file/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const passOrder = async (orderDetails) => {
  const token = authStore.token;
  if (!token) {
    throw new Error("User is not authenticated");
  }
  return await axios.post(domain + "/orders", orderDetails, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token, ID) => {
  return await axios.get(domain + "/orders/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrderById = async (token, ID) => {
  return await axios.get(domain + "/orders/order-detail/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
