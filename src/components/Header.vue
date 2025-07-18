<template>
  <header class="admin-header" v-if="authStore.user">
    <div class="search-bar"></div>

    <div class="header-right">
      <div class="user-menu" @click="toggleDropdown">
        <!-- <div class="avatar">{{ authStore.user.lastName[0] }}</div> -->
        <div class="info">
          <strong>{{ authStore.user.firstName }}</strong>
          <small>{{ authStore.user.roles[0].name }}</small>
        </div>

        <div v-if="showDropdown" class="dropdown">
          <p class="title">Mon Compte</p>
          <router-link to="/admin/settings"> Paramètres </router-link>
          <button @click="logout" class="logout">Déconnexion</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.admin-header {
  position: fixed;
  top: 0;
  left: 260px;
  right: 0;
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: 1px solid #ddd;
  z-index: 999;

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon {
      font-size: 18px;
      cursor: pointer;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      cursor: pointer;

      .avatar {
        background: $blue;
        color: white;
        font-weight: bold;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .info {
        display: flex;
        flex-direction: column;

        strong {
          font-size: 0.9rem;
        }

        small {
          font-size: 0.75rem;
          color: #666;
        }
      }

      .dropdown {
        position: absolute;
        top: 48px;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        width: 180px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

        .title {
          font-weight: bold;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        a,
        button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          text-decoration: none;
          font-size: 0.88rem;
          color: #333;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;

          &:hover {
            color: #0f62fe;
          }

          i {
            font-style: normal;
          }
        }

        .logout {
          color: #e11d48;

          &:hover {
            color: #be123c;
          }
        }
      }
    }
  }
}
</style>
