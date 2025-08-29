<template>
  <div class="dashboard">
    <!-- TITRE -->
    <h1 class="title">Tableau de bord</h1>

    <!-- STAT CARDS -->
    <div class="stats-grid">
      <div class="card" v-for="stat in stats" :key="stat.label">
        <h3>{{ stat.value }}</h3>
        <p>{{ stat.label }}</p>
      </div>
    </div>

    <!-- GRAPHIQUE DES RÉSERVATIONS -->
    <div class="chart-container">
      <canvas ref="reservationChart"></canvas>
    </div>

    <!-- TABLEAU DES DERNIÈRES RÉSERVATIONS -->
    <div class="table-container">
      <h2>📅 Dernières commandes</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Montant</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in reservations" :key="res.id">
            <td>{{ res.clientName }}</td>
            <td>{{ res.totalPrice.toLocaleString("fr-CI") }} Fcfa</td>
            <td>{{ formatDate(res.orderDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFinanceStore } from "@/stores/financeStore";
import Chart from "chart.js/auto";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

const financeStore = useFinanceStore();

// --- DONNÉES LOCALES ---
const stats = ref([
  { label: "Clients", value: 0 },
  { label: "Nombre de Medicines", value: 0 },
  { label: "Nombre de commandes", value: 0 },
]);

const reservations = ref([]);
const reservationChart = ref(null);
let chartInstance = null;

// --- FORMATAGE DES DATES ---
const formatDate = (dateStr) => {
  return format(new Date(dateStr), "dd MMMM yyyy, H:m", { locale: frLocale });
};

// --- CHART ---
function renderChart(reservationsData) {
  if (chartInstance) chartInstance.destroy();

  // Grouper par mois/année et additionner les montants
  const grouped = reservationsData.reduce((acc, res) => {
    const date = new Date(res.orderDate);
    const month = date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });

    acc[month] = (acc[month] || 0) + res.totalPrice;
    return acc;
  }, {});

  const labels = Object.keys(grouped); // Mois
  const values = Object.values(grouped); // Somme des montants

  chartInstance = new Chart(reservationChart.value, {
    type: "bar", // 🔄 je te mets en bar chart (plus adapté aux montants/mois)
    data: {
      labels,
      datasets: [
        {
          label: "Montant des commandes (FCFA) par mois",
          data: values,
          backgroundColor: "rgba(59,130,246,0.6)",
          borderColor: "#3b82f6",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value.toLocaleString("fr-FR") + " FCFA", // format avec séparateurs
          },
        },
      },
    },
  });
}

onMounted(() => {
  financeStore.fetchAllStats().then(() => {
    stats.value = [
      { label: "Clients", value: financeStore.stats.totalUsers },
      {
        label: "Nombre de Medicines",
        value: financeStore.stats.totalMedicines,
      },
      { label: "Nombre de commandes", value: financeStore.stats.totalOrders },
    ];
    reservations.value = financeStore.stats.lastFiveOrders;
    renderChart(financeStore.stats.lastFiveOrders);
  });
});
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;

  .title {
    font-size: 28px;
    margin-bottom: 20px;
    color: #1e293b;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 30px;

    .card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      text-align: center;

      h3 {
        font-size: 22px;
        margin: 0;
        color: #2563eb;
      }

      p {
        margin: 5px 0 0;
        font-size: 14px;
        color: #64748b;
      }
    }
  }

  .chart-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .table-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
        text-align: left;
      }

      th {
        background: #f8fafc;
        color: #334155;
        font-size: 14px;
      }

      td {
        font-size: 14px;
        color: #475569;
      }
    }
  }
}
</style>
