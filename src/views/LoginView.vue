<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <img src="/pharma.svg" />
      </div>
      <p class="subtitle">Connectez-vous avec votre email & mot de passe</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <label>Email</label>
        <input type="email" v-model="email" required />

        <div class="password-label">
          <label>Mot de passe</label>
          <a href="#"> Mot de passe oublié ?</a>
        </div>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          required
        />

        <button type="submit" class="login-button">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const showLoginPopup = ref(false);

const email = ref("");
const password = ref("");
const showDropdown = ref(false);

window.addEventListener("click", (e) => {
  if (!e.target.closest(".user-menu")) showDropdown.value = false;
});

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value).then(() => {
      showLoginPopup.value = false;
      router.push("/admin");
    });
  } catch (err) {
    console.error("Erreur de connexion :", err);
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-box {
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 100, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  border: 1px solid #e0e0e0;

  .logo img {
    height: 52px;
  }

  .subtitle {
    color: #666;
    font-size: 14px;
    margin: 0.5rem 0 1.5rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      text-align: left;
      font-size: 0.9rem;
      font-weight: 600;
    }

    input {
      padding: 0.6rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;

      &:active,
      &:focus {
        outline: 1px solid $blue;
      }
    }

    .password-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;

      a {
        font-size: 0.85rem;
        color: $dark;
        text-decoration: none;
      }
    }

    .login-button {
      background-color: $blue;
      color: white;
      border: none;
      padding: 0.7rem;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;

      &:hover {
        background-color: $blue-hover;
      }
    }
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 1rem 0;

    span {
      background: #fff;
      padding: 0 1rem;
      color: #999;
      font-size: 0.9rem;
    }

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #ddd;
    }
  }

  .social-button {
    width: 100%;
    padding: 0.7rem;
    border-radius: 5px;
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
    border: none;
    cursor: pointer;

    &.google {
      background-color: #db4437 !important;
      color: white;
    }
  }

  .register-text {
    font-size: 0.9rem;
    color: $dark;
    margin-top: 1rem;

    a {
      color: $blue;
      font-weight: 600;
      text-decoration: underline;
    }
  }
}
</style>
