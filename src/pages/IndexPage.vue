<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- 📚 Son Makaleler (sağ panel) -->
      <div class="col-12 col-md-8">
        <LatestArticles :articles="articles" />
      </div>

      <!-- 🗂️ Kategori Listesi (sol panel) -->
      <div class="col-12 col-md-4">
        <CategoryList />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import LatestArticles from "src/components/LatestArticles.vue";
import CategoryList from "src/components/CategoryList.vue";
import { useI18n } from "vue-i18n";

const { t, locale, messages } = useI18n();

// 🌐 Dil bazlı article verileri
const articles = computed(() => {
  const currentLocale = locale.value;
  const data = messages.value[currentLocale]?.articles;
  if (Array.isArray(data)) return data;
  console.error("Articles key is not an array or undefined:", data);
  return [];
});
</script>

<style scoped>
/* Ekstra responsive iyileştirme istersen burada yapabilirsin */
</style>
