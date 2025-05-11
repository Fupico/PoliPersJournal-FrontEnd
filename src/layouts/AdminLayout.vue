<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Poli Pers Journal </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-card flat class="q-mb-md q-pa-md column flex flex-center bg-primary">
          <q-img
            src="/icons/favicon-128x128.png"
            spinner-color="primary"
            style="max-width: 100px; max-height: 100px"
            class="q-mb-sm"
          />

          <q-item-label class="text-center text-bold text-white">
          </q-item-label>
        </q-card>
        <EssentialLink
          v-for="link in filteredLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useTokenStore } from "@/stores/tokenStore";
import EssentialLink, {
  type EssentialLinkProps,
} from "src/components/EssentialLink.vue";

const tokenStore = useTokenStore();
onMounted(() => {
  // Burada gerekli başlangıç işlemlerini yapabilirsiniz.
  // Örneğin, kullanıcı rolünü bir API'den alabilirsiniz.
  const token = localStorage.getItem("token");
  tokenStore.setToken(token ?? "");
  //console.log("Token setToken() çağrıldı");
  //console.log(tokenStore.email);
  //console.log(tokenStore.role);
  userRole.value = tokenStore.role; // Kullanıcı rolünü token'dan alıyoruz.
  //console.log(userRole.value);
});
// Kullanıcı rolü
const userRole = ref<String>("Admin"); // Örneğin, "admin", "teacher", "guardian" gibi değerler alabilir.

const allLinks: EssentialLinkProps[] = [
  {
    title: "Hakkımızda",
    icon: "dashboard",
    link: "/admin-about",
    roles: ["Admin"],
  },
  //   {
  //     title: "Atölyeler",
  //     icon: "person",
  //     link: "/workshop",
  //     roles: ["Admin", "User"],
  //   },
  //   {
  //     title: "Deneme",
  //     icon: "person",
  //     link: "/test",
  //     roles: ["User"],
  //   },
];

// Kullanıcının rolüne göre filtrelenmiş menü
const filteredLinks = computed(() => {
  return allLinks.filter((link) => {
    if (Array.isArray(userRole.value)) {
      // Eğer birden fazla rol varsa, en az bir tanesi eşleşiyorsa dahil et
      return userRole.value.some((role) => link.roles.includes(role));
    } else {
      // Tek rol varsa doğrudan eşleşmeyi kontrol et
      return link.roles.includes(userRole.value);
    }
  });
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
