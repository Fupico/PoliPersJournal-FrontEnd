<template>
  <q-card v-if="article" class="q-pa-md shadow-2 rounded-borders">
    <q-card-section class="q-mb-sm">
      <div class="text-subtitle1 text-bold">{{ article.title }}</div>
      <div class="text-caption text-grey-7">{{ article.date }}</div>
    </q-card-section>

    <q-card-section v-if="article.keywords?.length">
      <h3 class="text-subtitle2 text-weight-medium q-mb-sm">
        {{ t("article.tags") }}
      </h3>
      <div class="row q-gutter-xs">
        <q-badge
          v-for="tag in article.keywords"
          :key="tag"
          color="primary"
          class="text-caption q-mr-xs q-mb-xs"
        >
          {{ tag }}
        </q-badge>
      </div>
    </q-card-section>

    <q-btn
      v-if="article.pdfUrl"
      color="red"
      class="full-width q-mb-md"
      icon="picture_as_pdf"
      :label="t('article.downloadPdf')"
      @click="downloadPdf"
      no-caps
      unelevated
      size="md"
    />

    <q-separator spaced />

    <q-card-section>
      <h3 class="text-h6 text-bold q-mb-sm">{{ t("article.stats") }}</h3>
      <div class="column q-gutter-sm">
        <q-item class="bg-grey-1 rounded-borders">
          <q-item-section avatar>
            <q-icon name="visibility" color="blue" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t("article.viewCount") }}</q-item-label>
            <q-item-label caption>
              {{ article.languageViews }} {{ t("article.times") }} ({{
                t("article.languageOnly")
              }}) / {{ article.totalViews }} {{ t("article.total") }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="bg-grey-1 rounded-borders">
          <q-item-section avatar>
            <q-icon name="file_download" color="green" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t("article.downloadCount") }}</q-item-label>
            <q-item-label caption>
              {{ article.languageDownloads }} {{ t("article.times") }} ({{
                t("article.languageOnly")
              }}) / {{ article.totalDownloads }} {{ t("article.total") }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>

    <q-separator spaced />

    <q-card-section>
      <h3 class="text-h6 text-bold q-mb-sm">{{ t("article.share") }}</h3>
      <div class="row q-gutter-sm justify-around">
        <q-btn
          round
          dense
          unelevated
          color="blue"
          text-color="white"
          icon="fab fa-facebook-f"
          class="shadow-2"
          @click="share('facebook')"
        />
        <q-btn
          round
          dense
          unelevated
          color="blue-grey-10"
          text-color="white"
          icon="fab fa-twitter"
          class="shadow-2"
          @click="share('twitter')"
        />
        <q-btn
          round
          dense
          unelevated
          color="light-blue-10"
          text-color="white"
          icon="fab fa-linkedin-in"
          class="shadow-2"
          @click="share('linkedin')"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useArticleSidebarStore } from "@/stores/Article/articleSidebar";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { onMounted, watch } from "vue";

const route = useRoute();
const { t, locale } = useI18n();

const articleSidebarStore = useArticleSidebarStore();
const { sidebarData: article } = storeToRefs(articleSidebarStore);

const fetchData = () => {
  const slug = route.params.slug as string;
  if (slug) articleSidebarStore.fetchArticleSidebar(slug);
};

onMounted(fetchData);
watch(() => route.params.slug, fetchData);
watch(() => locale.value, fetchData);

const downloadPdf = () => {
  const slug = route.params.slug as string;
  if (slug) articleSidebarStore.downloadPdf(slug);
};

const share = (platform: string) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(article.value?.title || "");

  let shareUrl = "";
  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${text}`;
      break;
  }

  window.open(shareUrl, "_blank");
};
</script>
