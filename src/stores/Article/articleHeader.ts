import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export interface ArticleHeaderDto {
  title: string;
  date: string;
  category: string;
  language: string;
  readingTime: string;
  coverImageUrl: string;
}


export const useArticleHeaderStore = defineStore("articleHeader", () => {
  const { locale } = useI18n();
const articleHeader = ref<ArticleHeaderDto | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const fetchArticleHeader = async (slug: string) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get(`/posts/${slug}/header?lang=${locale.value}`);
      articleHeader.value = response.data;
      console.log("deneysel",articleHeader.value);
    } catch (error) {
      errorMessage.value = "Makale başlığı yüklenirken hata oluştu.";
      console.error("fetchArticleHeader error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    articleHeader,
    fetchArticleHeader,
    isLoading,
    errorMessage,
  };
});
