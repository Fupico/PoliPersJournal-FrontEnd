import { boot } from "quasar/wrappers"; // ✅ Doğru içe aktarma
import axios, { AxiosInstance } from "axios";
import { App } from "vue"; // ✅ Vue App tipini içe aktardık

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// 📌 API yapılandırması
const api = axios.create({
  baseURL: "https://polipersbackend.devrimmehmet.com/api", // 🌍 Backend API adresini buraya yaz
  //baseURL: "https://localhost:1923/api", // 🌍 Backend API adresini buraya yaz
  timeout: 10000, // ⏳ 10 saniye içinde yanıt dönmezse hata ver
  headers: {
    "Content-Type": "application/json",
  },
});

// 📌 Boot fonksiyonu (Quasar 3+ için uygun, TypeScript hatasız)
export default boot(({ app }: { app: App }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
