<template>
  <div class="entreprises-page">
    <!-- Header -->
    <div class="header">
      <div>
        <h2>Roles</h2>
        <p class="breadcrumb">Tableau de bord > <span>Roles</span></p>
      </div>
      <button class="add-btn" @click="showModal = true">Ajouter un role</button>
    </div>
    <!-- Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          <!-- Chargement en cours -->
          <tr v-if="roleStore.loading">
            <td colspan="7" class="loading-row">
              <div class="spinner"></div>
              Chargement des roles...
            </td>
          </tr>

          <!-- Données chargées -->
          <tr
            v-else
            v-for="(item, index) in roleStore.roles"
            :key="index"
            @click="openEntreprise(item.id)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination">
        <div class="range">{{ roleStore.roles.length }} Roles</div>
      </div>
    </div>

    <AddUserModal
      v-if="showModal"
      @close="showModal = false"
      @submit="handleSubmit"
    />
  </div>
</template>
item

<script setup>
import AddUserModal from "@/components/AddUserModal.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoleStore } from "@/stores/roleStore";

const router = useRouter();
const showModal = ref(false);
const roleStore = useRoleStore();

const handleSubmit = (data) => {
  // Envoi vers l’API ou ajout au tableau
  console.log("Données soumises :", data);
};

const openEntreprise = (id) => {
  // Logique pour ouvrir l'entreprise
};

const selected = ref([]);
const selectAll = ref(false);

const toggleAll = () => {
  selected.value = selectAll.value ? roleStore.roles.map((r) => r.id) : [];
};

watch(selected, (val) => {
  selectAll.value = val.length === roleStore.roles.length;
});

onMounted(() => {
  // Logique pour charger les entreprises depuis l'API
  roleStore.getAllRoles();
});
</script>

<style scoped lang="scss">
.entreprises-page {
  background: #fff;
  padding: 24px;
  border-radius: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 64px;

    h2 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .breadcrumb {
      font-size: 14px;
      color: $dark;
      font-weight: 600;

      span {
        font-weight: 400;
      }
    }

    .add-btn {
      background: $blue;
      color: #fff;
      font-weight: 600;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        background: $blue-hover;
      }
    }
  }

  .filter-bar {
    margin-bottom: 24px;

    .dropdown {
      border: 1px solid $border-color;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      outline: none;
      font-weight: 600;

      &:focus {
        border-color: $blue-hover;
      }
    }
  }

  .table-container {
    border-radius: 8px;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 12px;
        font-size: 14px;
        text-align: left;

        // &:nth-child(1) {
        //   width: 64px;
        // }
      }

      thead {
        background: $blue;
        color: #fff;
        font-weight: 600;
      }

      tbody tr:hover {
        background: #f3f4f6;
      }
    }
  }

  .pagination {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    color: $dark;

    .pages span {
      padding: 8px 12px;
      cursor: pointer;

      &.active {
        font-weight: 600;
        background-color: $blue;
      }
    }
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #1c0802, $alpha: 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .popup {
    width: 100%;
    max-width: 560px;
    background: #fff;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;

    @media (max-width: $phone) {
      max-width: none;
    }
  }
}
.loading-row {
  text-align: center;
  font-weight: 500;
  padding: 24px;

  .spinner {
    border: 3px solid #eee;
    border-top: 3px solid #1c0802;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 0 auto 12px auto;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (max-width: 768px) {
  .entreprises-page {
    padding: 16px;

    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      h2 {
        font-size: 24px;
      }

      .add-btn {
        width: 100%;
        font-size: 14px;
        padding: 10px;
      }
    }

    .table-container {
      overflow-x: auto;

      table {
        font-size: 12px;

        th,
        td {
          white-space: nowrap;
          padding: 8px;
        }
      }
    }

    .pagination {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 12px;

      .range {
        font-size: 13px;
      }
    }
  }

  .popup-overlay .popup {
    padding: 20px;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .entreprises-page {
    .header h2 {
      font-size: 20px;
    }

    .add-btn {
      font-size: 12px;
      padding: 8px;
    }

    .table-container table th,
    .table-container table td {
      font-size: 11px;
      padding: 6px;
    }
  }
}
</style>
