<template>
  <q-page class="q-pa-md">
    <q-layout view="hHh LpR fFf">
      <q-page-container class="row justify-center">
        <div class="col-12 col-md-8">
          <q-card class="category-detail-card">
            <CategoryHeader :categorySlug="categorySlug" />

            <q-separator />
            <q-separator /> <q-separator /> <q-separator /> <q-separator />
            <q-card-section>
              <ArticleList :categorySlug="categorySlug" />

              <br />
              <br />

              <RelatedArticles :categorySlug="categorySlug" />
            </q-card-section>
          </q-card>
        </div>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import CategoryHeader from "src/components/CategoryHeader.vue";
import ArticleList from "src/components/ArticleList.vue";
import RelatedArticles from "src/components/RelatedArticles.vue";

const route = useRoute();
const categorySlug = computed(() => route.params.slug as string);
</script>
