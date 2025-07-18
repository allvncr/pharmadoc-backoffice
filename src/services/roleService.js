import axios from "axios";
import domain from "@/environment";

export const getAllRoles = async (token) => {
  return await axios.get(domain + "/roles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addRole = async (token, userData) => {
  return await axios.post(domain + "/roles", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRoleByID = async (token, userData) => {
  return await axios.patch(
    domain + "/roles/" + userData.id,
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

export const deleteRoleByID = async (token, ID) => {
  return await axios.delete(domain + "/roles/" + ID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
