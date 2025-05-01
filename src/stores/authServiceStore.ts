import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";
import { useTokenStore } from "@/stores/tokenStore";

//LoginResponse modeli buraya gelecek

export const useAuthStore = defineStore("authStore", () => {
  const { locale } = useI18n();
  const tokenStore = useTokenStore();
  const responseData = ref<any>(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const login = async (data: any) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.post(`Auth/login`, data);
      responseData.value = response.data;
      tokenStore.setToken(responseData.value.data.token);
      localStorage.setItem("token", responseData.value.data.token); // Burada token'ı localStorage'a kaydedilecek
     
      // Burada token'ı localStorage'a kaydedilecek
      // buradan roller çekilecek
    } catch (error) {
      errorMessage.value = "Giriş yaparken hata oluştu.";
      console.error("Error fetching login", error);
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (data: any) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.post(`/register` + data);
      responseData.value = response.data;
    } catch (error) {
      errorMessage.value = "Kayıt olurken hata oluştu.";
      console.error("Error fetching register", error);
    } finally {
      isLoading.value = false;
    }
  };

  //watch(locale, login, { immediate: true }); // ✅ İlk çağrıldığında çalıştır

  return { responseData, login, register, isLoading, errorMessage };
});
