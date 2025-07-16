import { defineStore } from "pinia";
import {
  getAllOrders,
  updateOrderByID,
  deleteOrderByID,
} from "@/services/orderService";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    error: null,
    loading: false,
  }),

  actions: {
    async getAllOrders() {
      try {
        this.loading = true;
        this.error = null;
        const response = await getAllOrders(authStore.token);
        this.orders = response.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error =
          err.message ||
          "Échec de la récupération des utilisateurs. Essayez à nouveau.";
        this.orders = [];
        throw this.error;
      }
    },

    async updateOrderByID(userData) {
      try {
        await updateOrderByID(authStore.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async deleteOrderByID(ID) {
      try {
        await deleteOrderByID(authStore.token, ID);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    logout() {
      authStore.token = null;
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
  },
});
