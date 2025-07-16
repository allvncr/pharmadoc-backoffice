import { defineStore } from "pinia";
import {
  getAllSubCategories,
  updateSubCategorieByID,
  deleteSubCategorieByID,
} from "@/services/subCategorieService";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

export const useSubCategorieStore = defineStore("subCategorie", {
  state: () => ({
    subCategories: [],
    error: null,
    loading: false,
  }),

  actions: {
    async getAllSubCategories() {
      try {
        this.loading = true;
        this.error = null;
        const response = await getAllSubCategories(authStore.token);
        this.subCategories = response.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error =
          err.message ||
          "Échec de la récupération des utilisateurs. Essayez à nouveau.";
        this.subCategories = [];
        throw this.error;
      }
    },

    async updateSubCategorieByID(userData) {
      try {
        await updateSubCategorieByID(authStore.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async deleteSubCategorieByID(ID) {
      try {
        await deleteSubCategorieByID(authStore.token, ID);
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
