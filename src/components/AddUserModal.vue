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
        <input type="text" v-model="form.firstName" />

        <label>Nom</label>
        <input type="text" v-model="form.lastName" />

        <label>Email</label>
        <input type="text" v-model="form.email" required />

        <label>Role</label>
        <select v-model="form.roles" required multiple>
          <option v-for="role in roles" :key="role.value" :value="role.value">
            {{ role.name }}
          </option>
        </select>

        <label v-if="!props.modelValue">Password</label>
        <input
          v-if="!props.modelValue"
          type="password"
          v-model="form.password"
          required
        />

        <label>Date de naissance</label>
        <input type="date" v-model="form.birthDate" />

        <label>Verifié</label>
        <select v-model="form.valid" required>
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </select>

        <!-- Affichage des images si urls existe et contient des éléments -->
        <div
          v-if="
            props.modelValue &&
            props.modelValue.urls &&
            props.modelValue.urls.length
          "
          class="user-images"
        >
          <label>Images</label>
          <div class="images-grid">
            <div
              v-for="(url, idx) in props.modelValue.urls"
              :key="url"
              class="image-wrapper"
            >
              <img :src="url" alt="Image utilisateur" />
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn cancel" @click="close">
            Annuler
          </button>
          <button
            v-if="props.modelValue"
            type="button"
            class="btn danger"
            @click="handleDelete"
          >
            Supprimer
          </button>

          <button type="submit" class="btn submit">
            {{ props.modelValue ? "Modifier" : "Valider" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: Object, // la catégorie à éditer (ou null si création)
});

const emit = defineEmits(["close", "submit", "delete"]);

var form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  valid: false,
  roles: ["ROLE_ADMIN"],
});

const roles = [
  { value: "ROLE_ADMIN", name: "Administrateur" },
  { value: "ROLE_USER", name: "Client" },
];

watch(
  () => props.modelValue,
  (val) => {
    if (val) form = val;
  },
  { immediate: true }
);

const close = () => emit("close");

const submit = () => {
  emit("submit", { ...form });
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

  .modal-content {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    width: 720px;
    max-width: 95%;
    max-height: 90vh; // ✅ Limite la hauteur visible
    overflow-y: auto; // ✅ Active le scroll si débordement
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

      // ...existing code...
      .user-images {
        margin-top: 8px;

        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;

          .image-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fafafa;
            border-radius: 6px;
            padding: 6px;
            border: 1px solid #eee;

            img {
              width: 100%;
              border-radius: 4px;
              object-fit: contain;
            }
          }
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
}
</style>
