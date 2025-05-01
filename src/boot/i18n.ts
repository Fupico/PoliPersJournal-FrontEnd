import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import { api } from "src/boot/axios";

// ✅ i18n nesnesini oluştur
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "tr",
  messages: {}
});

// ✅ Backend’den çevirileri yükleyen fonksiyon
export async function loadTranslations(locale: string) {
  try {
    const response = await api.get(`/translations/${locale}`);
    i18n.global.setLocaleMessage(locale, response.data);
  } catch (error) {
    console.error("Çeviriler yüklenirken hata oluştu:", error);
  }
}

// ✅ Quasar boot işlemi
export default boot(async ({ app }) => {
  await loadTranslations(i18n.global.locale.value);
  app.use(i18n);

  // ✅ `$t` fonksiyonunu global property olarak ekleyelim
  app.config.globalProperties.$t = i18n.global.t;
});

export { i18n };
