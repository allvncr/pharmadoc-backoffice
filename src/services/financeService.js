import axios from "axios";
import domain from "@/environment";

export const getGlobalStats = async (token) => {
  return await axios.get(domain + "/charts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
