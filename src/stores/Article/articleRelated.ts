import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export interface RelatedArticleDto {
  id: number;
  title: string;
  date: string;
  slug: string; // ✅ eklendi
}


export const useArticleRelatedStore = defineStore("articleRelated", () => {
  const { locale } = useI18n();
  const relatedArticles = ref<RelatedArticleDto[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const fetchRelatedArticles = async (slug: string) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get(`/posts/${slug}/related?lang=${locale.value}`);
      relatedArticles.value = response.data;
    } catch (error) {
      errorMessage.value = "İlgili makaleler yüklenemedi.";
      console.error("fetchRelatedArticles error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    relatedArticles,
    fetchRelatedArticles,
    isLoading,
    errorMessage,
  };
});
