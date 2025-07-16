import { defineStore } from "pinia";
import {
  getAllCategories,
  updateCategorieByID,
  deleteCategorieByID,
} from "@/services/categorieService";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

export const useCategorieStore = defineStore("categorie", {
  state: () => ({
    categories: [],
    error: null,
    loading: false,
  }),

  actions: {
    async getAllCategories() {
      try {
        this.loading = true;
        this.error = null;
        const response = await getAllCategories(authStore.token);
        this.categories = response.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error =
          err.message ||
          "Échec de la récupération des utilisateurs. Essayez à nouveau.";
        this.categories = [];
        throw this.error;
      }
    },

    async updateCategorieByID(userData) {
      try {
        await updateCategorieByID(authStore.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async deleteCategorieByID(ID) {
      try {
        await deleteCategorieByID(authStore.token, ID);
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
