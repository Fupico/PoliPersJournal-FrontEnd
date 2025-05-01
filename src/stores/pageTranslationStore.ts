import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export interface PageTranslation {
  title: string;
  subtitle: string;
}

export const usePageTranslationStore = defineStore("pageTranslation", () => {
  const { locale } = useI18n();
  const pageData = ref<PageTranslation>({ title: "", subtitle: "" });
  const currentPageSlug = ref<string>(""); // 🆕 Mevcut sayfanın slug'ını takip et

  const fetchPageTranslation = async (pageSlug: string) => {
    try {
      currentPageSlug.value = pageSlug; // 🔄 Slug'ı güncelle
      const response = await api.get(
        `/PageTranslation/page-info?lang=${locale.value}&pageKey=${pageSlug}`
      );
      pageData.value = response.data;
    } catch (error) {
      console.error("Error fetching page translation", error);
    }
  };

  // 🌍 **Locale veya Sayfa Slug'ı Değişince API'yi Tekrar Çağır**
  watch([locale, currentPageSlug], () => {
    if (currentPageSlug.value) {
      fetchPageTranslation(currentPageSlug.value);
    }
  });

  return { pageData, fetchPageTranslation };
});
