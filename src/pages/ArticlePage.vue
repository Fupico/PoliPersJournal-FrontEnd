<template>
  <!-- Quasar sayfa bileşeni -->
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- 📌 Bileşenler -->
        <ArticleHeader />
        <ArticleContent />
      </div>
      <div class="col-12 col-md-3 q-ml-md">
        <ArticleAuthors />
        <br />
        <ArticleSidebar />
        <ArticleRelated />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ArticleHeader from "@/components/Article/ArticleHeader.vue";
import ArticleAuthors from "@/components/Article/ArticleAuthors.vue";
import ArticleContent from "@/components/Article/ArticleContent.vue";
import ArticleRelated from "@/components/Article/ArticleRelated.vue";
import ArticleSidebar from "@/components/Article/ArticleSidebar.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { api } from "src/boot/axios"; // axios instance

const route = useRoute();
const { locale } = useI18n();

// 🟢 Sayfa yüklendiğinde görüntülenme sayısını arttır
onMounted(async () => {
  const slug = route.params.slug as string;
  if (!slug) return;

  try {
    await api.post(`/posts/${slug}/stats/view?lang=${locale.value}`);
  } catch (error) {
    console.error("Görüntülenme sayacı arttırılamadı:", error);
  }
});
</script>

<style scoped>
.q-ml-md {
  margin-left: 16px;
}
</style>
