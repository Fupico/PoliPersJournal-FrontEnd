<template>
  <q-page class="flex flex-center q-pa-xl">
    <div class="text-center">
      <q-icon name="person" size="80px" color="primary" />
      <h1 class="text-h4 q-mt-md">Yazar Sayfası</h1>
      <p class="text-subtitle1 text-grey-7 q-mt-sm">
        Bu yazar sayfası yakında aktif olacak.
      </p>

      <q-badge color="blue-2" text-color="blue-10" class="q-mt-md">
        🔗 Profil: <strong>{{ profileLink }}</strong>
      </q-badge>

      <div class="q-mt-xl row justify-center q-gutter-md">
        <q-btn
          icon="arrow_back"
          label="Geri Git"
          color="grey-8"
          flat
          @click="goBack"
        />
        <q-btn icon="home" label="Ana Sayfa" color="primary" to="/" flat />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const profileLink = route.params.profileLink as string;

const goBack = () => {
  router.back(); // 👈 Önceki sayfaya döner
};
</script>
