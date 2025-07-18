<template>
  <div class="modal-backdrop" @click.self="close">
    <form @submit.prevent="submit" class="popup-content">
      <!-- Header -->
      <div class="modal-header">
        <h3>Detail commande</h3>
        <button class="close-btn" @click="close">✖</button>
      </div>
      <div class="order-header">
        <p><strong>Numéro de commande :</strong> {{ form.orderNumber }}</p>
        <p><strong>Date :</strong> {{ formatDate(form.orderDate) }}</p>
        <p><strong>Commentaire :</strong> {{ form.comment }}</p>
        <label>Statut : </label>
        <select
          v-model="form.status"
          :class="['status', form.status.toLowerCase()]"
        >
          <option v-for="status in statuts" :value="status.value">
            {{ status.label }}
          </option>
        </select>
      </div>

      <h4>Articles commandés</h4>

      <table class="order-detail-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Image</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="line in form.orderLines" :key="line.id">
            <td>{{ line.medicine?.name }}</td>
            <td>
              <img :src="line.medicine?.url" :alt="line.medicine?.name" />
            </td>
            <td>{{ line.quantity }}</td>
            <td>{{ line.medicine.newPrice.toLocaleString("fr-CI") }} Fcfa</td>
            <td>
              {{
                (line.medicine.newPrice * line.quantity).toLocaleString("fr-CI")
              }}
              Fcfa
            </td>
          </tr>
        </tbody>
      </table>

      <div class="order-total">
        Total de la commande :
        {{ form.totalAmount.toLocaleString("fr-CI") }} Fcfa
      </div>

      <div class="modal-footer">
        <button type="button" class="btn cancel" @click="close">Fermer</button>

        <button type="submit" class="btn submit">Modifier</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

const formatDate = (dateStr) => {
  return format(new Date(dateStr), "dd MMMM yyyy, H:m", { locale: frLocale });
};

const statuts = [
  { value: "EN_PREPARATION", label: "En preparation" },
  { value: "EN_ATTENTE", label: "En attente" },
  { value: "LIVREE", label: "Livrée" },
  { value: "ANNULEE", label: "Annulée" },
];

const props = defineProps({
  modelValue: Object, // la catégorie à éditer (ou null si création)
});

const emit = defineEmits(["close", "submit"]);

var form = reactive({
  id: "",
  address: "",
  comment: "",
  orderDate: "",
  orderLines: [],
  orderNumber: "",
  phoneNumber: "",
  status: "",
  totalAmount: "",
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) form = val;
  },
  { immediate: true }
);

const close = () => emit("close");

const submit = () => {
  emit("submit", {
    status: form.status,
  });
};

const handleDelete = () => {
  emit("delete");
};
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba($color: #1c0802, $alpha: 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  .popup-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        font-size: 18px;
        font-weight: 600;
        line-height: 1;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #311;
      }
    }

    .order-line {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1rem 0;
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;

      img {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }

      .info p {
        margin: 4px 0;
        font-size: 14px;
      }
    }

    .order-header {
      background: #f9f9f9;
      padding: 16px;
      margin-bottom: 24px;
      border-radius: 8px;

      p {
        margin: 8px 0;
      }

      .status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: capitalize;
      }

      .paid {
        background: #dcfce7;
        color: #16a34a;
      }

      .en_attente,
      .en_preparation,
      .confirmee {
        background: #fef3c7;
        color: #b45309;
      }

      .livree,
      .expediee {
        background: #d1fae5;
        color: #059669;
      }

      .annulee,
      .retournee,
      .remboursee {
        background: #fef2f2;
        color: #b91c1c;
      }

      select {
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #eee;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #ddd;
        }
      }
    }

    .order-detail-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;

      th {
        background: #f1f1f1;
        padding: 12px;
        text-align: left;
        font-weight: bold;
        font-size: 14px;
      }

      td {
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
        font-size: 14px;
        vertical-align: middle;

        img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          border: 1px solid #eee;
          border-radius: 4px;
        }
      }
    }

    .order-total {
      text-align: right;
      margin-top: 16px;
      font-weight: bold;
      font-size: 16px;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 10px;

      .btn {
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        border: none;
        cursor: pointer;

        &.cancel {
          background: transparent;
        }

        &.submit {
          background: $blue;
          color: #fff;

          &:hover {
            background: $blue-hover;
          }
        }

        &.danger {
          background: #e74c3c;
          color: #fff;

          &:hover {
            background: #c0392b;
          }
        }
      }
    }
  }
}
</style>
