import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export interface ArticleSidebarDto {
  id: number;
  title: string;
  date: string;
  pdfUrl: string;
  views: number;
  downloads: number;
  keywords: string[];
}

export const useArticleSidebarStore = defineStore("articleSidebar", () => {
  const { locale } = useI18n();
  const sidebarData = ref<ArticleSidebarDto | null>(null);
  const isLoading = ref(false);

  const fetchArticleSidebar = async (slug: string) => {
    isLoading.value = true;
    try {
      const res = await api.get(`/posts/${slug}/sidebar?lang=${locale.value}`);
      sidebarData.value = res.data;
    } catch (err) {
      console.error("fetchArticleSidebar error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const downloadPdf = async (slug: string) => {
    if (!sidebarData.value?.pdfUrl) return;

    try {
      await api.post(`/posts/${slug}/stats/download?lang=${locale.value}`);
    } catch (error) {
      console.error("PDF indirme istatistiği gönderilemedi:", error);
    }

    window.open(sidebarData.value.pdfUrl, "_blank");
  };

  return {
    sidebarData,
    fetchArticleSidebar,
    downloadPdf,
    isLoading
  };
});
