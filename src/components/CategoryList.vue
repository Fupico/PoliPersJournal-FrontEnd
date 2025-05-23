<template>
  <q-card flat bordered class="modern-flat-card">
    <q-card-section>
      <div class="text-center q-mb-md">
        <q-icon name="category" size="40px" color="primary" />
        <div class="text-h6 text-primary">{{ pageData?.title || "Kategoriler" }}</div>
        <div class="text-subtitle2 text-grey-7">
          {{ pageData?.subtitle || "Farklı Kategoriler Arasında Gezinin" }}
        </div>
      </div>

      <q-list separator>
        <q-item
          v-for="category in categories"
          :key="category.id"
          :clickable="category.articleCount > 0"
          v-ripple="category.articleCount > 0"
          class="modern-category-item"
          :class="{ 'disabled': category.articleCount === 0 }"
          @click="category.articleCount > 0 && goToCategory(category.slug)"
        >
          <q-item-section avatar>
            <q-icon
              :name="category.icon"
              size="26px"
              :color="category.articleCount > 0 ? 'primary' : 'grey-5'"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="category-title">
              {{ category.name }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge
              :color="category.articleCount > 0 ? 'blue-4' : 'grey-4'"
              rounded
              class="q-px-sm"
            >
              {{ category.articleCount }}
            </q-badge>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCategoriesStore } from "src/stores/categoriesStore";
import { usePageTranslationStore } from "src/stores/pageTranslationStore";

const router = useRouter();
const categoriesStore = useCategoriesStore();
const pageTranslationStore = usePageTranslationStore();

const categories = computed(() => categoriesStore.categories);
const pageData = computed(() => pageTranslationStore.pageData);

const goToCategory = (slug: string) => {
  router.push(`/categories/${slug}`);
};

onMounted(() => {
  categoriesStore.fetchCategories();
  pageTranslationStore.fetchPageTranslation("categories");
});
</script>

<style scoped>
.modern-flat-card {
  border-radius: 12px;
  padding: 16px;
   background: linear-gradient(135deg, #e3f2fd, #bbdefb, #90caf9);
}

.modern-category-item {
  padding: 10px 14px;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  border-radius: 8px;
}

.modern-category-item:hover {
  background: #f0f4ff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  background-color: #fafafa;
}

.category-title {
  font-weight: 500;
  font-size: 16px;
  color: #333;
}

@media (max-width: 600px) {
  .category-title {
    font-size: 15px;
  }

  .modern-category-item {
    padding: 8px 12px;
  }
}
</style>
