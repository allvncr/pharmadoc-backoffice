import axios from "axios";
import domain from "@/environment";

export const getAllSubCategories = async (token) => {
  return await axios.get(domain + "/subcategories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateSubCategorieByID = async (token, userData) => {
  return await axios.patch(domain + "/subcategories/" + userData.id, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSubCategorieByID = async (token, ID) => {
  return await axios.delete(domain + "/subcategories/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
