import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/DashboardView.vue"),
      },
      { path: "users", component: () => import("@/views/UsersView.vue") },
      {
        path: "categories",
        component: () => import("@/views/CategoriesView.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
