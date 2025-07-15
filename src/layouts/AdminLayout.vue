<template>
  <div class="dashboard-layout">
    <Sidebar />

    <div class="main-section">
      <Header />
      <main class="page-content">
        <router-view />
        <!-- Le contenu scrollable -->
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

/* === SIDEBAR === */
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #2563eb, #a3e635);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.logo h2 {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  background: linear-gradient(to right, #2563eb, #22c55e);
  font-weight: bold;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #111;
  font-size: 0.95rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: 0.3s;
}

.nav-links a:hover {
  background: #f1f5f9;
  font-weight: 500;
}

/* === CONTENU PRINCIPAL === */
.main-section {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* === HEADER FIXE === */
.header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  left: 240px;
  right: 0;
  z-index: 900;
}

.header input {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 250px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* === CONTENU QUI SCROLLE === */
.page-content {
  margin-top: 60px;
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}
</style>
