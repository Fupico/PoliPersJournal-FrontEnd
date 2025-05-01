import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export interface Company {
  id: number;
  name: string;
  logoUrl: string;
}

export const useCompanyStore = defineStore("company", () => {
  const company = ref<Company | null>(null);

  const fetchCompany = async () => {
    try {
      const response = await api.get<Company>("/company");
      company.value = response.data;
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  return { company, fetchCompany };
});
