<template>
  <!-- 🌀 Yüklenme durumu -->
  <q-skeleton
    v-if="isLoading"
    height="500px"
    class="rounded-borders q-mb-md"
    square
  />

  <!-- ✅ Veri geldiyse göster -->
  <q-card v-else-if="articleHeader" class="header-card q-mb-md">
    <q-img :src="articleHeader.coverImageUrl" class="relative-position">
      <div class="overlay">
        <div class="content-box">
          <h1 class="text-h4 text-white q-mb-sm">
            {{ articleHeader.title }}
          </h1>
          <p class="text-subtitle2 text-white q-mb-sm">
            {{ articleHeader.date }} • {{ articleHeader.category }}

            <template v-if="articleHeader.readingTime">
              • {{ articleHeader.readingTime }} {{ t("article.minute") }}
            </template>
          </p>
        </div>
      </div>
    </q-img>
  </q-card>
</template>

<script setup lang="ts">
import { useArticleHeaderStore } from "@/stores/Article/articleHeader";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });

// 📍 Route ve dil bilgisi
const route = useRoute();

// 📦 Store bağlantısı
const articleHeaderStore = useArticleHeaderStore();
const { articleHeader, isLoading } = storeToRefs(articleHeaderStore);

// 🔁 Ortak fetch fonksiyonu
const fetchHeaderBySlug = () => {
  const slug = route.params.slug as string;
  if (slug) {
    articleHeaderStore.fetchArticleHeader(slug);
  }
};

// 🟢 Sayfa yüklendiğinde veriyi çek
onMounted(() => {
  fetchHeaderBySlug();
});

// ✳️ Slug değiştiğinde tekrar veri çek
watch(
  () => route.params.slug,
  () => {
    fetchHeaderBySlug();
  }
);

// 🌍 DİL değiştiğinde tekrar veri çek
watch(
  () => locale.value,
  () => {
    fetchHeaderBySlug();
  }
);
</script>

<style scoped>
.header-card {
  border-radius: 12px;
  overflow: hidden;
}

.overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  border-radius: 0 0 12px 12px;
}

.content-box {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px 30px;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  text-align: center;
}
</style>
