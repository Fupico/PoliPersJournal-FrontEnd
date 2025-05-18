<template>
  <div class="bordered-container">
    <div class="row items-center justify-between q-mb-md">
      <p class="text-h5 font-bold left-aligned-underline">
        {{ t("article.latestArticles") }}
      </p>
      <q-btn
        flat
        to="/categories"
        class="text-body1 q-pa-sm rounded bordered-button"
      >
        {{ t("article.viewAll") }}
      </q-btn>
    </div>

    <q-separator inset />

    <!-- ❗ Veri yoksa uyarı göster -->
    <div v-if="articles.length === 0" class="q-pa-md text-grey-6 text-center">
      {{ t("article.noArticles") }}
    </div>

    <!-- 📄 Makale Listesi -->
    <div v-else class="row q-col-gutter-md">
      <div
        v-for="article in paginatedArticles"
        :key="article.slug"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card
          bordered
          class="q-mb-md rounded-borders cursor-pointer"
          @click="router.push(`/posts/${article.slug}`)"
        >
          <q-img :src="article.coverImageUrl" ratio="16:9" />

          <q-card-section>
            <div class="text-caption text-primary font-medium">
              {{ article.category || t("article.uncategorized") }}
            </div>

            <div class="text-body1 text-bold q-mb-xs ellipsis-2-lines">
              {{ article.title }}
            </div>

            <div class="text-caption text-grey-7 ellipsis">
              {{ article.summary }}
            </div>

            <div class="text-caption text-grey-6 q-mt-sm">
              📅 {{ article.date }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Sayfalama -->
    <div class="row justify-center q-mt-lg">
      <q-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :max="totalPages"
        boundary-numbers
        color="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { fetchLatestArticles, LatestArticleDto } from "@/stores/articleService";
import { useRouter } from "vue-router";
const router = useRouter();

const { locale, t } = useI18n();

const articles = ref<LatestArticleDto[]>([]);
const currentPage = ref(1);
const itemsPerPage = 8;

const loadArticles = async () => {
  try {
    articles.value = await fetchLatestArticles(locale.value);
  } catch (err) {
    console.error("Makale verileri çekilemedi", err);
    articles.value = [];
  }
};

onMounted(loadArticles);
watch(() => locale.value, loadArticles);

const totalPages = computed(() =>
  Math.ceil(articles.value.length / itemsPerPage)
);

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return articles.value.slice(start, start + itemsPerPage);
});
</script>

<style scoped>
.left-aligned-underline {
  text-decoration: underline;
  margin: 0;
}
.bordered-button {
  border: 1px solid #d3d3d3;
  color: #d3d3d3;
  transition: all 0.2s ease-in-out;
}
.bordered-button:hover {
  border-color: #027be3;
  color: #027be3;
}
.rounded-borders {
  border-radius: 12px;
}
.bordered-container {
  border: 1px solid rgba(211, 211, 211, 0.6);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.clamp-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3; /* ✅ Bu eklendi */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ellipsis-2-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
