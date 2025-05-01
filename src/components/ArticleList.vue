<template>
  <div class="article-list">
    <h4 class="text-h6 text-primary">
      {{ t("categories.articles_in_category") }}
    </h4>

    <div v-if="loading" class="loading-container">
      <q-spinner color="primary" size="3em" />
      <p class="text-grey">Loading articles...</p>
    </div>

    <p v-else-if="error" class="text-negative">{{ error }}</p>

    <div v-else class="articles-grid">
      <q-card
        v-for="post in articles"
        :key="post.id"
        class="article-card"
        clickable
        v-ripple
        @click="goToPost(post.slug)"
      >
        <q-img
          v-if="post.imageUrl"
          :src="post.imageUrl"
          class="article-image"
          fit="cover"
          spinner-color="primary"
        />
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
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const router = useRouter();
const props = defineProps<{ categorySlug: string }>();

const articles = ref([]);
const loading = ref(false);
const error = ref("");

// ✅ API'den makaleleri çek
const fetchArticles = async () => {
  loading.value = true;
  try {
    const response = await api.get(
      `/categories/${props.categorySlug}/posts?lang=${locale.value}`
    );
    articles.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch category data.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArticles);
watch(() => props.categorySlug, fetchArticles);
watch(locale, fetchArticles);

const goToPost = (slug: string) => {
  router.push(`/posts/${slug}`);
};
</script>

<style scoped>
/* 🔹 Genel Stil */
.article-list {
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
  overflow: hidden;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
}

/* 🖼️ Makale Görseli */
.article-image {
  height: 150px;
  object-fit: cover;
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

/* ⏳ Yüklenme Durumu */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

/* 📱 Responsive Tasarım */
@media (max-width: 600px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
