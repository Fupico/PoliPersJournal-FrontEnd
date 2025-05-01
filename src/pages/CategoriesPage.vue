<template>
  <q-page class="q-pa-md">
    <q-layout view="hHh LpR fFf">
      <q-page-container class="row justify-center">
        <!-- Orta Panel - Kategoriler -->
        <div class="col-12 col-md-6">
          <CategoryList />
        </div>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCategoriesStore } from "src/stores/categoriesStore";
import { usePageTranslationStore } from "src/stores/pageTranslationStore"; // ✅ Küçük harf

import CategoryList from "src/components/CategoryList.vue";

const categoriesStore = useCategoriesStore();
const pageTranslationStore = usePageTranslationStore();

onMounted(() => {
  categoriesStore.fetchCategories();
  pageTranslationStore.fetchPageTranslation("categories"); // ✅ Sayfa çevirisini çek
});
</script>
