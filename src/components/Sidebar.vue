<template>
  <aside class="sidebar">
    <div class="logo">
      <img src="../assets/images/logo_officiel.png" />
    </div>

    <nav class="nav-links">
      <RouterLink to="/admin/dashboard" active-class="active">
        Tableau de bord
      </RouterLink>
      <RouterLink to="/admin/users" active-class="active">
        Utilisateurs
      </RouterLink>
      <RouterLink to="/admin/medecines" active-class="active">
        Medecines
      </RouterLink>
      <RouterLink to="/admin/categories" active-class="active">
        Categories
      </RouterLink>
      <!-- <RouterLink to="/admin/subCategories" active-class="active">
        Sous-Categories
      </RouterLink> -->
      <RouterLink to="/admin/roles" active-class="active"> Roles </RouterLink>
      <RouterLink to="/admin/orders" active-class="active"> Orders </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 260px;
  height: 100vh;
  padding: 1.5rem 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding-left: 0.5rem;

    img {
      height: 24px;
    }

    .logo-icon {
      background: linear-gradient(to right, #0f62fe, #a8e633);
      color: white;
      font-weight: bold;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 700;

      .blue {
        color: #0f62fe;
      }

      .green {
        color: #7dd71d;
      }
    }
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 12px;

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      font-weight: 500;
      text-decoration: none;
      color: #111;
      transition: all 0.2s;

      &:hover {
        background-color: #f3f4f6;
      }

      &.active {
        background: $blue;
        color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
    }

    .icon {
      font-size: 1.1rem;
    }
  }
}
</style>
