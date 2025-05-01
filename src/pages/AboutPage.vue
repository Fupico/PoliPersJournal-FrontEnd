<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="about-card">
      <!-- Başlık Bölümü -->
      <q-card-section class="text-center header-section">
        <q-icon name="info" size="50px" color="primary" />
        <h1 class="text-h4 q-mt-md">{{ t("about.title") }}</h1>
        <p class="text-subtitle1 text-grey">{{ t("about.subtitle") }}</p>
      </q-card-section>

      <q-separator />

      <!-- Şirket Bilgisi -->
      <q-card-section class="content-section">
        <q-icon name="business" color="primary" size="30px" />
        <h3 class="text-h6">{{ t("about.companyTitle") }}</h3>
        <p class="text-body1">{{ t("about.companyDesc") }}</p>
      </q-card-section>

      <q-separator />

      <!-- Misyon -->
      <q-card-section class="content-section">
        <q-icon name="flag" color="blue-6" size="30px" />
        <h3 class="text-h6">{{ t("about.missionTitle") }}</h3>
        <p class="text-body1">{{ t("about.missionDesc") }}</p>
      </q-card-section>

      <q-separator />

      <!-- Vizyon -->
      <q-card-section class="content-section">
        <q-icon name="visibility" color="green-6" size="30px" />
        <h3 class="text-h6">{{ t("about.visionTitle") }}</h3>
        <p class="text-body1">{{ t("about.visionDesc") }}</p>
      </q-card-section>

      <q-separator />

      <!-- İletişim Butonu -->
      <q-card-section class="text-center action-section">
        <q-btn
          color="primary"
          icon="mail"
          :label="t('about.contactUs')"
          to="/contact"
          unelevated
          class="contact-btn"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { loadTranslations } from "src/boot/i18n";

const { t, locale } = useI18n();

onMounted(async () => {
  await loadTranslations(locale.value);
});
</script>

<style scoped>
/* 🏢 Genel Kart Tasarımı */
.about-card {
  max-width: 850px;
  width: 100%;
  margin: auto;
  padding: 10px;
  border-radius: 26px;
  background: #ffffff;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 🔵 Başlık Bölümü */
.header-section {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 10px;
  border-radius: 12px 12px 0 0;
}

/* 📌 İçerik Bölümleri */
.content-section {
  padding: 10px;
  text-align: center;
}

.content-section h3 {
  margin-top: 5px;
  font-weight: 600;
}

.content-section p {
  color: #555;
  line-height: 1;
}

/* ✉️ İletişim Butonu */
.action-section {
  padding-bottom: 10px;
}

.contact-btn {
  padding: 5px 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}

.contact-btn:hover {
  background: #004999;
}

/* 📱 **Mobil Uyumluluk** */
@media (max-width: 768px) {
  .about-card {
    padding: 1px;
  }

  .header-section {
    padding: 1px;
  }

  .content-section {
    padding: 1px;
  }

  .contact-btn {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}
</style>
