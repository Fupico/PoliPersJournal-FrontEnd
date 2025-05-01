import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/IndexPage.vue") }],
  },
  {
    path: "/contact",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/ContactPage.vue") }],
  },
  {
    path: "/categories",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("@/pages/CategoriesPage.vue") },
      { path: ":slug", component: () => import("@/pages/CategoryDetailPage.vue") },
    ],
  },
    {
    path: "/posts",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("@/pages/CategoriesPage.vue") },

    ],
  },
  {
    path: "/articles",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/ArticlePage.vue") }],
  },
   {
    path: "/articleeditor",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/ArticleEditorPage.vue") }],
  },
  {
    path: "/about",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/AboutPage.vue") }],
  },
  {
    path: "/posts/:slug", // 📌 🔥 Dinamik Makale Sayfası (EKLENDİ)
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/ArticlePage.vue") }],
    props: true, // ✅ Slug'ı bileşene props olarak geç
  },
{
  path: "/author/:profileLink", // 🔥 Tekil yazar sayfası için doğru path
  component: () => import("@/layouts/MainLayout.vue"),
  children: [
    {
      path: "",
      component: () => import("@/pages/AuthorProfilePage.vue"), // 👈 Bu sayfa gelecekte detaylı olacak
    },
  ],
  props: true
},

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("@/pages/ErrorNotFound.vue") }],
  },


];

export default routes;
