import axios from "axios";
import domain from "@/environment";

export const getAllCategories = async (token) => {
  return await axios.get(domain + "/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addCategorie = async (token, userData) => {
  return await axios.post(domain + "/categories", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategorieByID = async (token, userData) => {
  return await axios.patch(
    domain + "/categories/" + userData.id,
    {
      name: userData.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteCategorieByID = async (token, ID) => {
  return await axios.delete(domain + "/categories/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
