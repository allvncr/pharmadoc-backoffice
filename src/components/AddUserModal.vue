<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <h3>Ajouter un utilisateur</h3>
        <button class="close-btn" @click="close">✖</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit">
        <label>Prénom</label>
        <input type="text" v-model="form.firstname" required />

        <label>Nom</label>
        <input type="text" v-model="form.lastname" required />

        <label>Email</label>
        <input type="text" v-model="form.email" required />

        <label>Télephone</label>
        <input type="text" v-model="form.tel" required />

        <label>Role</label>
        <select v-model="form.role" required>
          <option value="superAdmin">Administrateur</option>
          <option value="proprio">Proprio</option>
          <option value="client">Client</option>
        </select>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn cancel" @click="close">
            Annuler
          </button>
          <button type="submit" class="btn submit">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineEmits } from "vue";
const emit = defineEmits(["close", "submit"]);

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  tel: "",
  role: "superAdmin",
});

const close = () => emit("close");

const submit = () => {
  // envoyer les données à l’API ou parent
  emit("submit", { ...form });
  // close();
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

  .modal-content {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    width: 560px;
    max-width: 95%;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        font-size: 18px;
        font-weight: 600;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #311;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      label {
        font-size: 13px;
        font-weight: 500;
        color: #111;
      }

      input,
      select,
      textarea {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #eee;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #ddd;
        }
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
        }
      }
    }
  }
}
</style>
