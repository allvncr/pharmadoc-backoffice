<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <h3>Ajouter un role</h3>
        <button class="close-btn" @click="close">✖</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit">
        <label>Nom</label>
        <input type="text" v-model="form.name" required />

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

const form = reactive({
  name: "",
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) form.name = val.name;
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
