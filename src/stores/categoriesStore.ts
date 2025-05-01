import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  articleCount: number;
}

export const useCategoriesStore = defineStore("categories", () => {
  const { locale } = useI18n();

  const categories = ref<Category[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const fetchCategories = async () => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get(`/categories?lang=${locale.value}`);
      categories.value = response.data;
    } catch (error) {
      errorMessage.value = "Kategoriler yüklenirken hata oluştu.";
      console.error("Error fetching categories", error);
    } finally {
      isLoading.value = false;
    }
  };

  watch(locale, fetchCategories, { immediate: true }); // ✅ İlk çağrıldığında çalıştır

  return { categories, fetchCategories, isLoading, errorMessage };
});
