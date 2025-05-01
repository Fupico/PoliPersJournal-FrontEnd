import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export interface SectionDto {
  title: string;
  content: string;
}

export interface ArticleContentDto {
  abstract: string;
  sections: SectionDto[];
}


export const useArticleContentStore = defineStore("articleContent", () => {
  const { locale } = useI18n();

  const content = ref<ArticleContentDto | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const fetchArticleContent = async (slug: string) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get(`/posts/${slug}/content?lang=${locale.value}`);
      content.value = response.data;
    } catch (err) {
      errorMessage.value = "İçerik yüklenirken bir hata oluştu.";
      console.error("fetchArticleContent error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    content,
    isLoading,
    errorMessage,
    fetchArticleContent,
  };
});
