import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

// 📌 Makale tipi
interface Article {
  title: string;
  date: string;
  authors: string[];
  content: string;
  readTime: number;
  views: number;
  category: string;
  tags: string[];
}

export const useArticleStore = defineStore("articleStore", () => {
  const article = ref<Article | null>(null);

  const fetchArticleBySlug = async (slug: string, lang: string) => {
    try {
      const response = await axios.get(
        `https://localhost:7115/api/articles/${slug}?lang=${lang}`
      );
      article.value = response.data;
    } catch (error) {
      console.error("Makale alınırken hata oluştu:", error);
      article.value = null;
    }
  };

  return { article, fetchArticleBySlug };
});
