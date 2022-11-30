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
      path: "/productos",
      name: "productos",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProductsView.vue"),
    },
    {
        path: '/producto/:id?',
        name: 'producto',
        component: () => import("../views/ProductView.vue"),
        props: true
    },
    {
      path: "/clientes",
      name: "clientes",
      component: () => import("../views/ClientsView.vue"),
    },
    {
        path: '/cliente/:id?',
        name: 'cliente',
        component: () => import("../views/ClientView.vue"),
        props: true
    },
    {
      path: "/administrator/proveedores",
      name: "proveedores",
      component: () => import("../views/administrator/SuppliersView.vue"),
    },
    {
        path: '/administrator/proveedor/:id?',
        name: 'proveedor',
        component: () => import("../views/administrator/SupplierView.vue"),
        props: true
    },
    {
      path: "/administrator/zonas",
      name: "zonas",
      component: () => import("../views/administrator/ZonesView.vue"),
    },
    {
        path: '/administrator/zona/:id?',
        name: 'zona',
        component: () => import("../views/administrator/ZoneView.vue"),
        props: true
    },
    {
      path: "/administrator/vendedores",
      name: "vendedores",
      component: () => import("../views/administrator/SellersView.vue"),
    },
    {
        path: '/administrator/vendedor/:id?',
        name: 'vendedor',
        component: () => import("../views/administrator/ClientView.vue"),
        props: true
    },
  ],
});

export default router;
