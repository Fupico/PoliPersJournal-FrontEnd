<template>
  <div v-if="relatedPosts.length > 0" class="q-mt-md related-articles">
    <h4 class="text-h6 text-primary">{{ t("categories.related_articles") }}</h4>

    <div class="articles-grid">
      <q-card
        v-for="post in relatedPosts"
        :key="post.id"
        class="article-card"
        clickable
        v-ripple
        @click="goToPost(post.slug)"
      >
        <q-card-section class="article-content">
          <q-item-label class="text-weight-bold article-title">
            {{ post.title }}
          </q-item-label>
          <q-item-label caption class="article-summary">
            {{ post.summary || "No summary available" }}
          </q-item-label>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t, locale } = useI18n();
const router = useRouter();
const props = defineProps<{ categorySlug: string }>();

const relatedPosts = ref([]);

// ✅ İlgili makaleleri API'den çek
const fetchRelatedPosts = async () => {
  try {
    const response = await api.get(
      `/categories/${props.categorySlug}/related-posts?lang=${locale.value}`
    );
    relatedPosts.value = response.data;
  } catch (error) {
    console.error("İlgili makaleler alınamadı:", error);
  }
};

onMounted(fetchRelatedPosts);
watch(() => props.categorySlug, fetchRelatedPosts);
watch(locale, fetchRelatedPosts);

const goToPost = (slug: string) => {
  router.push(`/posts/${slug}`);
};
</script>

<style scoped>
/* 🔹 Genel Stil */
.related-articles {
  padding: 10px;
}

/* 🔵 Makale Kartlarını Grid Haline Getir */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

/* 🟢 Makale Kart Stili */
.article-card {
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  background: #fff;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
}

/* 🔸 Makale İçeriği */
.article-content {
  padding: 15px;
}

/* 🟡 Başlık Stili */
.article-title {
  font-size: 1.1rem;
  color: #333;
  transition: color 0.2s ease;
}

.article-card:hover .article-title {
  color: #007bff;
}

/* 🟠 Özet Stili */
.article-summary {
  font-size: 0.9rem;
  color: #666;
}

/* 📱 Responsive Tasarım */
@media (max-width: 600px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
