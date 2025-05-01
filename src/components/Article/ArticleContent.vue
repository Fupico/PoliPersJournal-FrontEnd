<template>
  <q-card v-if="article" class="article-card q-mx-auto">
    <q-card-section>
      <div class="article-content">
        <!-- 📌 Özet (Abstract) -->
        <div class="abstract" v-if="article.abstract">
          <h2 class="abstract-title">
            <q-icon name="info" color="primary" class="q-mr-sm" />
            {{ t("article.abstractTitle") }}
          </h2>
          <div class="abstract-body">
            <p>{{ article.abstract }}</p>
          </div>
        </div>

        <!-- 📌 İçerik Bölümleri -->
        <q-separator class="q-my-md" />
        <div
          v-for="(section, index) in article.sections"
          :key="index"
          class="section"
        >
          <h2 class="section-title">
            <q-icon name="article" color="primary" class="q-mr-sm" />
            {{ section.title }}
          </h2>
          <div v-html="section.content" class="section-content animated" />
          <q-separator class="q-my-lg" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useArticleContentStore } from "src/stores/Article/articleContent";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute();
const { locale } = useI18n();

const articleContentStore = useArticleContentStore();
const { content: article, isLoading } = storeToRefs(articleContentStore);

const fetchContent = () => {
  const slug = route.params.slug as string;
  if (slug) {
    articleContentStore.fetchArticleContent(slug);
  }
};

onMounted(fetchContent);
watch(() => route.params.slug, fetchContent);
watch(() => locale.value, fetchContent);
</script>

<style scoped>
.article-card {
  border-radius: 16px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #ffffff, #f0f4ff);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
}

.article-card:hover {
  transform: scale(1.01);
  box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.12);
}

.article-content {
  font-size: 18px;
  line-height: 1.8;
  color: #2c2c2c;
}

.abstract {
  margin-bottom: 30px;
  background: #e3f2fd;
  border-left: 6px solid #1976d2;
  padding: 20px;
  border-radius: 8px;
}

.abstract-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1976d2;
  display: flex;
  align-items: center;
}

.abstract-body p {
  margin: 0;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #1565c0;
  margin: 30px 0 10px;
  border-left: 5px solid #1565c0;
  padding-left: 12px;
  display: flex;
  align-items: center;
}

.section-content {
  font-size: 16px;
  color: #444;
  margin-left: 5px;
  transition: all 0.3s ease;
}

.section-content img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section-content img:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

blockquote {
  font-style: italic;
  background: #f1f8ff;
  border-left: 4px solid #42a5f5;
  padding: 15px 20px;
  color: #555;
  margin: 20px 0;
  border-radius: 4px;
}
</style>
