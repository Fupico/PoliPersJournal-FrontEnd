<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="header-bg">
      <q-toolbar class="q-px-md">
        <q-toolbar-title class="company-section">
          <router-link to="/">
            <q-avatar v-if="company?.logoUrl" class="company-logo">
              <img :src="company.logoUrl" alt="Company Logo" />
            </q-avatar>
          </router-link>
          <router-link to="/">
            <span class="company-name">{{
              company?.name || "Loading..."
            }}</span>
          </router-link>
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          class="menu-btn"
          @click="toggleRightDrawer"
        />
      </q-toolbar>

      <q-bar class="bg-white text-dark nav-bar">
        <div class="row justify-between items-center full-width">
          <div class="breadcrumbs-container">
            <div class="breadcrumbs">
              <router-link to="/" class="text-primary">Home</router-link>
              <span v-for="(crumb, index) in displayedBreadcrumbs" :key="index">
                <span class="text-grey-7"> > </span>
                <router-link :to="crumb.link" class="text-primary">
                  {{ crumb.label }}
                </router-link>
              </span>
            </div>
          </div>
          <div
            class="lang-selector row items-center justify-center"
            style="text-align: center; align-items: center !important"
          >
            <template v-for="(lang, index) in languages" :key="lang.code">
              <q-btn
                flat
                dense
                :label="lang.name"
                @click="changeLanguage(lang.code)"
                :class="{ 'active-lang': locale === lang.code }"
              />
              <span v-if="index !== languages.length - 1" class="lang-separator"
                >|</span
              >
            </template>
          </div>
        </div>
      </q-bar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      overlay
      class="drawer-style"
    >
      <q-list dense class="q-pa-md">
        <q-item clickable v-ripple to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>{{ t("sidebarMenu.home") }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/about">
          <q-item-section avatar><q-icon name="info" /></q-item-section>
          <q-item-section>{{ t("sidebarMenu.about") }}</q-item-section>
        </q-item>
        <!--
        <q-item clickable v-ripple to="/submit-article">
          <q-item-section avatar><q-icon name="send" /></q-item-section>
          <q-item-section>{{ t("sidebarMenu.submitArticle") }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/posts">
          <q-item-section avatar><q-icon name="article" /></q-item-section>
          <q-item-section>{{ t("sidebarMenu.articles") }}</q-item-section>
        </q-item> -->

        <q-item clickable v-ripple to="/categories">
          <q-item-section avatar><q-icon name="category" /></q-item-section>
          <q-item-section>{{ t("sidebarMenu.categories") }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/contact">
          <q-item-section avatar><q-icon name="email" /></q-item-section>
          <q-item-section>{{ t("sidebarMenu.contact") }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="footer-bg">
      <q-bar v-if="isMobile" class="bg-white text-dark mobile-breadcrumb">
        <div class="breadcrumbs-container">
          <div class="breadcrumbs">
            <router-link to="/" class="text-primary">Home</router-link>
            <span v-for="(crumb, index) in displayedBreadcrumbs" :key="index">
              <span class="text-grey-7"> > </span>
              <router-link :to="crumb.link" class="text-primary">
                {{ crumb.label }}
              </router-link>
            </span>
          </div>
        </div>
      </q-bar>
      <q-toolbar>
        <q-toolbar-title class="footer-content">
          <router-link to="/">
            {{ company?.name || "Loading..." }}
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useCompanyStore } from "src/stores/companyStore";
import { useLanguageStore } from "src/stores/languageStore";
import { loadTranslations } from "src/boot/i18n";

const isMobile = ref(false);
const route = useRoute();
const rightDrawerOpen = ref(false);
const { t, locale } = useI18n();
const companyStore = useCompanyStore();
const languageStore = useLanguageStore();
const company = computed(() => companyStore.company);
const languages = computed(() => languageStore.languages);

const breadcrumbs = computed(() => {
  const pathArray = route.path.split("/").filter((path) => path);
  let breadcrumbPath = "";
  return pathArray.map((segment) => {
    breadcrumbPath += `/${segment}`;
    return {
      label: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      link: breadcrumbPath,
    };
  });
});

const displayedBreadcrumbs = computed(() => {
  return breadcrumbs.value;
});

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

onMounted(() => {
  companyStore.fetchCompany();
  languageStore.fetchLanguages();
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth <= 768;
  });
});

const changeLanguage = async (lang: string) => {
  locale.value = lang;
  await loadTranslations(lang);
};
</script>

<style scoped>
/* Genel Ayarlar */
.header-bg {
  background: linear-gradient(to right, #003366, #005bb5);
  padding: 0;
}
a {
  text-decoration: none;
  color: inherit; /* Ebeveyn rengini miras al */
}
.nav-bar {
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.company-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.company-logo img {
  max-width: 40px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.company-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
}

.menu-btn {
  color: white;
}

/* Dil Seçici */
.lang-selector {
  display: flex;
  gap: 8px;
  white-space: nowrap;
  justify-content: center; /* Yatayda ortala */
}

.lang-selector .q-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
}

.lang-selector .active-lang {
  background-color: #122ece;
  padding: 3px;
  color: white;
}

.lang-separator {
  color: #ccc;
  margin: 0 4px;
}

/* Breadcrumbs */
.breadcrumbs-container {
  overflow-x: auto;
  white-space: nowrap;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumbs a {
  font-size: 0.9rem;
  color: #005bb5;
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.breadcrumbs .text-grey-7 {
  margin: 0 4px;
}

/* Drawer (Yan Menü) */
.drawer-style {
  width: 280px;
  background-color: #f8f9fa; /* Daha açık bir arka plan */
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1); /* Daha belirgin gölge */
}

.drawer-style .q-list {
  padding: 0; /* İç padding'i kaldır */
}

.drawer-style .q-item {
  padding: 12px 16px; /* Daha fazla dikey padding */
  border-left: 3px solid transparent; /* Sol kenar çizgisi */
  transition: background-color 0.4s ease, border-color 0.5s ease;
}

.drawer-style .q-item:hover {
  background-color: #507eac; /* Hover rengi */
}

.drawer-style .q-item.router-link-active {
  border-color: #1d7bda; /* Aktif öğe rengi */
  background-color: #c3c6c9; /* Aktif öğe arka planı */
  font-weight: 900; /* Aktif öğe kalın */
}

.drawer-style .q-item-section {
  font-size: 20px !important; /* !important ekledik */
}
html {
  box-sizing: border-box;
}

.drawer-style .q-item-section.q-item-section--avatar {
  min-width: 48px; /* Sabit simge genişliği */
  text-align: center; /* Simgeleri ortala */
}

.drawer-style .q-icon {
  font-size: 1.2rem;
  color: #003366; /* Simge rengi */
}

/* Footer */
.footer-bg {
  background: linear-gradient(to right, #003366, #005bb5);
  text-align: center;
  padding: 0;
  color: white;
}

.footer-content {
  font-size: 1rem;
  font-weight: 500;
}

/* Mobil Uyumluluk */
@media (max-width: 768px) {
  .nav-bar {
    flex-direction: row;
    align-items: center;
  }

  .nav-bar.mobile-nav {
    justify-content: center;
  }

  .breadcrumbs-container {
    display: none;
  }

  .lang-selector {
    margin-top: 0;
    width: 100%; /* Sayfa genişliğine yay */
  }

  .lang-selector .q-select {
    min-width: 100px;
    margin-top: 10px;
  }

  .mobile-breadcrumb {
    padding: 8px 16px;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  }

  .mobile-breadcrumb .breadcrumbs-container {
    display: block;
  }

  .mobile-breadcrumb .breadcrumbs {
    justify-content: center;
  }

  .footer-bg {
    padding-top: 1px;
    width: 100%;
  }
}
</style>
