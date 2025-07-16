import { defineStore } from "pinia";
import {
  login,
  register,
  updateUser,
  deleteUserByID,
  getAllUsers,
  updateUserByID,
} from "@/services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [],
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    error: null,
    loading: false,
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await login(email, password);

        this.token = response.data.token;
        this.user = {
          id: response.data.userId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          roles: response.data.roles || [],
        };

        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", JSON.stringify(this.token));
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la connexion. Essayez à nouveau.";
        throw this.error;
      }
    },
    async register(userData) {
      try {
        await register(userData);
        this.error = null; // Réinitialiser les erreurs
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de l’inscription. Essayez à nouveau.";
        throw this.error;
      }
    },

    async updateUser(userData) {
      try {
        const response = await updateUser(this.token, userData);
        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async updateUserByID(userData) {
      try {
        await updateUserByID(this.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async deleteUserByID(ID) {
      try {
        await deleteUserByID(this.token, ID);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async getAllUsers() {
      try {
        this.loading = true;
        this.error = null;
        const response = await getAllUsers(this.token);
        this.users = response.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error =
          err.message ||
          "Échec de la récupération des utilisateurs. Essayez à nouveau.";
        this.users = [];
        throw this.error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
  },
});
