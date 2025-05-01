<template>
  <!-- ⛔ Eğer hiç veri yoksa hiç render etme -->
  <q-card v-if="relatedArticles.length > 0" class="q-mt-md shadow-2">
    <q-card-section>
      <h3 class="text-h6 text-bold q-mb-md">
        📚 {{ t("article.relatedArticlesTitle") }}
      </h3>

      <!-- 🔄 Yüklenme durumu -->
      <q-skeleton v-if="isLoading" height="100px" />

      <!-- ✅ Veriler yüklendiyse -->
      <q-list v-else separator bordered>
        <q-item
          v-for="article in relatedArticles"
          :key="article.id"
          clickable
          v-ripple
          class="q-hoverable"
          @click="goToArticle(article.slug)"
        >
          <q-item-section avatar>
            <q-icon name="description" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-medium">
              {{ article.title }}
            </q-item-label>
            <q-item-label caption>
              {{ article.date }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chevron_right" color="grey-6" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useArticleRelatedStore } from "src/stores/Article/articleRelated";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const { locale, t } = useI18n();
const articleRelatedStore = useArticleRelatedStore();
const { relatedArticles, isLoading } = storeToRefs(articleRelatedStore);
const goToArticle = (slug: string) => {
  router.push(`/posts/${slug}`);
};
const fetchData = () => {
  const slug = route.params.slug as string;
  if (slug) articleRelatedStore.fetchRelatedArticles(slug);
};

onMounted(fetchData);
watch(() => route.params.slug, fetchData);
watch(() => locale.value, fetchData);
</script>

<style scoped>
.q-hoverable:hover {
  background-color: #f5f5f5;
  transition: 0.2s ease;
  cursor: pointer;
}
</style>
