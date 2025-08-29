import { defineStore } from "pinia";
import { getGlobalStats } from "@/services/financeService";
import { useAuthStore } from "./authStore";

const authStore = useAuthStore();

export const useFinanceStore = defineStore("finance", {
  state: () => ({
    error: null,
    stats: null,
  }),

  actions: {
    async fetchAllStats() {
      try {
        const response = await getGlobalStats(authStore.token);

        this.stats = response.data;
        this.error = null;
      } catch (err) {
        this.stats = null;
        this.error =
          err.response?.data?.message ||
          "Échec de la recuperation de toutes les statistiques. Essayez à nouveau.";
      }
    },
  },
});
