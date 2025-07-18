import { defineStore } from "pinia";
import {
  getMedecines,
  getMedecineById,
  getCategories,
  addMedecines,
  deleteMedecineByID,
  updateMedecineByID,
} from "@/services/medecineService";
import Medecine from "@/models/medecine";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

export const useMedecineStore = defineStore("medecine", {
  state: () => ({
    medecines: [],
    medecine: null,
    categories: [],
    totalPages: 1,
    totalElements: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async all_medecines(searchQuery = "") {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await getMedecines(searchQuery);
        this.medecines = data.content.map((med) => Medecine.create(med)) || [];
        this.totalPages = data.totalPages || 1;
        this.totalElements = data.totalElements || 0;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Erreur lors de la récupération des médicaments.";
      } finally {
        this.loading = false;
      }
    },

    async all_categories() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await getCategories();
        this.categories = data || [];
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Erreur lors de la récupération des categories.";
      } finally {
        this.loading = false;
      }
    },

    async one_medecine(id) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await getMedecineById(id);
        this.medecine = Medecine.create(data) || null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Erreur lors de la récupération du médicament.";
      } finally {
        this.loading = false;
      }
    },

    async addMedecine(userData) {
      try {
        await addMedecines(authStore.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec lors de la création. Essayez à nouveau.";
        throw this.error;
      }
    },

    async updateMedecineByID(userData) {
      try {
        await updateMedecineByID(authStore.token, userData);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },

    async deleteMedecineByID(ID) {
      try {
        await deleteMedecineByID(authStore.token, ID);
        this.error = null;
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Échec de la mise à jour des informations utilisateur. Essayez à nouveau.";
        throw this.error;
      }
    },
  },
});
