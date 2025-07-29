<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <div class="modal-header">
        <h3>
          {{
            props.modelValue
              ? "Modifier un medicament"
              : "Ajouter un medicament"
          }}
        </h3>
        <button class="close-btn" @click="close">✖</button>
      </div>

      <form @submit.prevent="submit">
        <label>Nom</label>
        <input type="text" v-model="form.name" required />

        <label>Petite description</label>
        <textarea v-model="form.smallDescription" required></textarea>

        <label>Image (URL / Fichier)</label>
        <input type="file" @change="handleFileUpload" />

        <div v-if="form.url">
          <img :src="form.url" alt="Image preview" class="image-preview" />
          <button type="button" class="close-btn" @click="deleteImage">
            ✖
          </button>
        </div>

        <label>Référence</label>
        <input type="text" v-model="form.reference" />

        <!-- <label>Quantité</label>
        <input type="number" v-model.number="form.quantity" min="0" /> -->

        <label>Prix actuel</label>
        <input type="number" v-model.number="form.newPrice" min="0" />

        <label>Ancien prix</label>
        <input type="number" v-model.number="form.oldPrice" min="0" />

        <label>Description complète</label>
        <textarea v-model="form.completeDescription"></textarea>

        <label>Conseils d’utilisation</label>
        <textarea v-model="form.usingAdvice"></textarea>

        <label>Composition</label>
        <textarea v-model="form.composition"></textarea>

        <label>Catégorie</label>
        <select v-model="form.idCategory">
          <option disabled value="0">Sélectionnez une catégorie</option>
          <option
            v-for="cat in categorieStore.categories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>

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
import { useCategorieStore } from "@/stores/categorieStore";
import { useMedecineStore } from "@/stores/medecineStore";

const categorieStore = useCategorieStore();
const medecineStore = useMedecineStore();

const props = defineProps({
  modelValue: Object,
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "submit", "delete"]);

const form = reactive({
  id: null,
  name: "",
  smallDescription: "",
  url: "", // remplacé par fileUpload
  reference: "",
  quantity: 0,
  newPrice: 0,
  oldPrice: 0,
  completeDescription: "",
  usingAdvice: "",
  composition: "",
  idCategory: 0,
  file: null,
});

const deleteImage = () => {
  medecineStore
    .deleteImage(form.id)
    .then(() => {
      form.url = "";
      form.file = null;
    })
    .catch((err) => {
      console.error("Erreur lors de la suppression de l'image :", err);
    });
};

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      Object.assign(form, {
        ...val,
        file: null,
      });
    }
  },
  { immediate: true }
);

const close = () => emit("close");

const submit = () => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("smallDescription", form.smallDescription);
  formData.append("reference", form.reference);
  formData.append("quantity", form.quantity);
  // formData.append("newPrice", form.newPrice);
  // formData.append("oldPrice", form.oldPrice);
  formData.append("completeDescription", form.completeDescription);
  formData.append("usingAdvice", form.usingAdvice);
  formData.append("composition", form.composition);
  formData.append("idCategory", form.idCategory);
  if (form.file) {
    formData.append("file", form.file);
  }

  emit("submit", formData);
};

const handleDelete = () => emit("delete");

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) form.file = file;
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

      div {
        position: relative;

        & .close-btn {
          position: absolute;
          top: 0px;
          left: 96px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #e74c3c;
        }
      }

      .image-preview {
        max-width: 96px;
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
