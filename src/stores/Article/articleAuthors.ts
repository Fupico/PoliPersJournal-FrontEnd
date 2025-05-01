import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export interface ArticleAuthorDto {
  id: number;
  name: string;
  university: string;
  avatar: string;
  bio: string; // ✅ bu var ama `bioKey` yok
    profileLink?: string; // ✅ URL'de kullanılacak slug alanı

}


export const useArticleAuthorsStore = defineStore("articleAuthors", () => {
  const { locale } = useI18n();
  const authors = ref<ArticleAuthorDto[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const fetchArticleAuthors = async (slug: string) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get(`/posts/${slug}/authors?lang=${locale.value}`);
      authors.value = response.data;
    } catch (error) {
      errorMessage.value = "Yazar bilgileri alınamadı.";
      console.error("fetchArticleAuthors error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    authors,
    fetchArticleAuthors,
    isLoading,
    errorMessage,
  };
});
