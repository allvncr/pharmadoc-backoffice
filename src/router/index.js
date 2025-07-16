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
        path: "medecines",
        component: () => import("@/views/MedecinesView.vue"),
      },
      {
        path: "categories",
        component: () => import("@/views/CategoriesView.vue"),
      },
      {
        path: "subCategories",
        component: () => import("@/views/SubCategoriesView.vue"),
      },
      {
        path: "roles",
        component: () => import("@/views/RolesView.vue"),
      },
      {
        path: "orders",
        component: () => import("@/views/OrdersView.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
