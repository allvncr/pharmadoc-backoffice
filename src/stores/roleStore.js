import { defineStore } from "pinia";
import {
  getAllRoles,
  addRole,
  updateRoleByID,
  deleteRoleByID,
} from "@/services/roleService";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: [],
    error: null,
    loading: false,
  }),

  actions: {
    async getAllRoles() {
      try {
        this.loading = true;
        this.error = null;
        const response = await getAllRoles(authStore.token);
        this.roles = response.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error =
          err.message ||
          "Échec de la récupération des utilisateurs. Essayez à nouveau.";
        this.roles = [];
        throw this.error;
      }
    },

    async addRole(userData) {
      try {
        await addRole(authStore.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec lors de la création. Essayez à nouveau.";
        throw this.error;
      }
    },

    async updateRoleByID(userData) {
      try {
        await updateRoleByID(authStore.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async deleteRoleByID(ID) {
      try {
        await deleteRoleByID(authStore.token, ID);
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
