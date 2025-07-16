import axios from "axios";
import domain from "@/environment";

export const getAllOrders = async (token) => {
  return await axios.get(domain + "/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateOrderByID = async (token, userData) => {
  return await axios.patch(domain + "/orders/" + userData.id, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteOrderByID = async (token, ID) => {
  return await axios.delete(domain + "/orders/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
