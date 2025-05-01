<template>
  <q-card-section class="category-header text-center">
    <!-- 🟢 Kategori İkonu (Daire İçinde) -->
    <div class="icon-container">
      <q-icon :name="category?.icon || 'folder'" size="60px" color="white" />
    </div>

    <!-- 🔵 Kategori Başlığı -->
    <h2 class="text-h5 text-weight-bold q-mt-md">
      {{ categoryTranslation?.title || category?.name || "Unknown Category" }}
    </h2>

    <!-- 🔹 Kategori Açıklaması -->
    <p class="text-subtitle2 text-grey-7 q-mt-sm">
      {{ categoryTranslation?.subtitle || "No description available" }}
    </p>
  </q-card-section>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted, computed } from "vue";
import { usePageTranslationStore } from "src/stores/pageTranslationStore";
import { useCategoriesStore } from "src/stores/categoriesStore";

const props = defineProps<{ categorySlug: string }>();

const pageTranslationStore = usePageTranslationStore();
const categoriesStore = useCategoriesStore();

const category = computed(() =>
  categoriesStore.categories.find((cat) => cat.slug === props.categorySlug)
);

const categoryTranslation = computed(() => pageTranslationStore.pageData);

// ✅ Kategori verisini API'den çek
const fetchCategoryTranslation = async () => {
  await pageTranslationStore.fetchPageTranslation(props.categorySlug);
};

onMounted(fetchCategoryTranslation);
watch(() => props.categorySlug, fetchCategoryTranslation);
</script>

<style scoped>
/* 🟢 Arka Plan Efekti */
.category-header {
  position: relative;
  padding: 40px 20px;
  background: linear-gradient(135deg, #4c6375, #02ddfa);
  color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

/* 🔵 Kategori İkonu İçin Dairesel Alan */
.icon-container {
  width: 80px;
  height: 80px;
  background: rgba(44, 42, 42, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: auto;
  backdrop-filter: blur(5px);
}

/* 🔹 Kategori Açıklaması */
.text-subtitle2 {
  font-size: 1rem;
  line-height: 1.5;
}

/* 📱 Responsive Tasarım */
@media (max-width: 600px) {
  .category-header {
    padding: 30px 15px;
  }
  .icon-container {
    width: 60px;
    height: 60px;
  }
  h2 {
    font-size: 1.2rem;
  }
}
</style>
