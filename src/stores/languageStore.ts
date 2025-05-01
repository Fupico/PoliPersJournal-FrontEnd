import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export interface Language {
  code: string;
  name: string;
}

export const useLanguageStore = defineStore("language", () => {
  const languages = ref<Language[]>([]);

  const fetchLanguages = async () => {
    try {
      const response = await api.get<Language[]>("/language");
      languages.value = response.data;
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  return { languages, fetchLanguages };
});
