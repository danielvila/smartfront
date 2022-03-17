import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/clientes",
      name: "clientes",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ClientsView.vue"),
    },
    {
        path: '/cliente/:id?',
        name: 'cliente',
        component: () => import("../views/ClientView.vue"),
        props: true
    },
    {
      path: "/zonas",
      name: "zonas",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ZonesView.vue"),
    },
    {
        path: '/zona/:id?',
        name: 'zona',
        component: () => import("../views/ZoneView.vue"),
        props: true
    },
  ],
});

export default router;
