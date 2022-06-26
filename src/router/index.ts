import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import CollectionsView from "@/views/dashboard/CollectionsView.vue";
import CollectionDetailView from "@/views/dashboard/CollectionDetailView.vue";
import authGuard from "@/router/guards/auth.guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: authGuard,
    children: [
      {
        path: "collections",
        name: "collections",
        component: CollectionsView,
      },
      {
        path: "collection-detail/:id",
        name: "collectionDetail",
        component: CollectionDetailView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
