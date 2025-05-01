<template>
  <q-card class="category-card">
    <q-card-section class="text-center">
      <q-icon name="category" size="50px" color="primary" />
      <h2 class="text-h5 text-primary">
        {{ pageData?.title || "Loading..." }}
      </h2>
      <p class="text-subtitle2 text-grey-7">
        {{ pageData?.subtitle || "Farklı kategoriler arasında gezinin" }}
      </p>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-list bordered separator class="q-gutter-md">
        <q-item
          v-for="category in categories"
          :key="category.id"
          :clickable="category.articleCount > 0"
          v-ripple="category.articleCount > 0"
          class="category-item"
          :class="{ 'disabled-category': category.articleCount === 0 }"
          @click="
            category.articleCount > 0 ? goToCategory(category.slug) : null
          "
        >
          <!-- Kategori İkonu -->
          <q-item-section avatar>
            <div class="icon-container">
              <q-icon
                :name="category.icon"
                size="30px"
                :color="category.articleCount > 0 ? 'primary' : 'grey-6'"
              />
            </div>
          </q-item-section>

          <!-- Kategori Başlığı -->
          <q-item-section>
            <q-item-label class="text-weight-bold text-h6 text-dark">
              {{ category.name }}
            </q-item-label>
          </q-item-section>

          <!-- Makale Sayısı -->
          <q-item-section side>
            <q-badge
              :color="category.articleCount > 0 ? 'blue' : 'grey-5'"
              rounded
              class="text-bold"
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
/* 🔹 Genel kategori kartı */
.category-card {
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
}

/* 🔵 Kategori Kutuları */
.category-item {
  padding: 16px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out, background 0.3s ease-in-out;
  font-size: 18px;
  background-color: white;
}

/* 🌟 Hover Efekti */
.category-item:hover {
  background: rgba(33, 150, 243, 0.1);
  transform: scale(1.02);
}

/* 🏆 Kategori İkonları İçin Dairesel Alan */
.icon-container {
  width: 50px;
  height: 50px;
  background: rgba(33, 150, 243, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease-in-out;
}

.category-item:hover .icon-container {
  background: rgba(33, 150, 243, 0.3);
}

/* 🟠 Makale Sayısı 0 Olan Kategorilere Özel Stil */
.disabled-category {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
  transform: none;
}

.disabled-category:hover {
  background-color: #f5f5f5;
  transform: none;
}

/* 🟣 Kategori Başlığı */
.text-h6 {
  font-weight: bold;
  color: #333;
}

/* 📱 Responsive Tasarım */
@media (max-width: 600px) {
  .category-card {
    padding: 15px;
  }

  .category-item {
    padding: 12px;
  }

  .icon-container {
    width: 40px;
    height: 40px;
  }
}
</style>
