<template>
  <q-page class="flex flex-center">
    <q-card class="contact-card">
      <!-- Başlık -->
      <q-card-section class="text-center">
        <q-icon name="info" size="60px" color="primary" class="animated-icon" />
        <h2 class="text-h5 q-mt-md text-primary">{{ t("contact.title") }}</h2>
        <p class="text-subtitle2 text-grey">{{ t("contact.subtitle") }}</p>
      </q-card-section>

      <q-separator inset />

      <!-- 📌 İletişim Bilgileri -->
      <q-card-section>
        <q-list separator dense>
          <q-item v-if="contact.addressDetail">
            <q-item-section avatar>
              <q-icon name="location_on" color="primary" size="28px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{
                t("contact.address")
              }}</q-item-label>
              <q-item-label caption>{{ contact.addressDetail }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="contact.emailAddress">
            <q-item-section avatar>
              <q-icon name="email" color="primary" size="28px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{
                t("contact.email")
              }}</q-item-label>
              <q-item-label
                caption
                class="clickable text-primary"
                @click="sendEmail"
              >
                {{ contact.emailAddress }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator inset />

      <!-- 📌 Mesaj Gönderme Butonu -->
      <q-card-section class="text-center">
        <q-btn
          color="primary"
          icon="mail"
          :label="t('contact.sendMessage')"
          @click="openDialog"
          unelevated
          class="send-btn"
        />
      </q-card-section>

      <!-- 📌 Harita Butonu (Eğer Koordinatlar Varsa) -->
      <!-- <q-card-section v-if="contact.coordinates" class="text-center">
        <q-btn
          color="blue"
          icon="map"
          unelevated
          :label="t('contact.viewOnMap')"
          :href="contact.coordinates"
          target="_blank"
        />
      </q-card-section> -->
    </q-card>

    <!-- 📌 Mesaj Gönderme Dialogu -->
    <q-dialog v-model="isDialogOpen">
      <q-card class="dialog-card">
        <q-card-section class="row items-center">
          <q-icon name="mail_outline" color="primary" size="30px" />
          <span class="text-h6 q-ml-md">{{ t("contact.sendMessage") }}</span>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input
            v-model="message.subject"
            :label="t('contact.messageSubject')"
            outlined
            dense
          />
          <q-input
            v-model="message.senderName"
            :label="t('contact.senderName')"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="message.senderContact"
            :label="t('contact.senderContact')"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="message.content"
            :label="t('contact.messageContent')"
            outlined
            dense
            type="textarea"
            class="q-mt-md"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            :label="t('contact.cancel')"
            color="negative"
            v-close-popup
          />
          <q-btn
            :label="t('contact.send')"
            color="primary"
            @click="sendMessage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const isDialogOpen = ref(false);

const contact = computed(() => ({
  companyName: t("contact.companyName"),
  addressDetail: t("contact.addressDetail"),
  phoneNumber: t("contact.phoneNumber"),
  emailAddress: t("contact.emailAddress"),
  coordinates: t("contact.coordinates"),
}));

const message = ref({
  subject: "",
  senderName: "",
  senderContact: "",
  content: "",
});

watch(locale, () => {
  message.value = {
    subject: "",
    senderName: "",
    senderContact: "",
    content: "",
  };
});

const openDialog = () => {
  isDialogOpen.value = true;
};

const sendEmail = () => {
  window.location.href = `mailto:${contact.value.emailAddress}`;
};

const sendMessage = () => {
  if (
    !message.value.subject ||
    !message.value.senderName ||
    !message.value.senderContact ||
    !message.value.content
  ) {
    alert(t("contact.fillAllFields"));
    return;
  }

  console.log("Gönderilen Mesaj:", message.value);
  isDialogOpen.value = false;
  message.value = {
    subject: "",
    senderName: "",
    senderContact: "",
    content: "",
  };
  alert(t("contact.messageSent"));
};
</script>

<style scoped>
/* 📌 **Genel Kart Stili** */
.contact-card {
  max-width: 450px;
  padding: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  border-radius: 22px;
  background: #fff;
  transition: transform 0.2s ease-in-out;
}

.contact-card:hover {
  transform: scale(1.05);
}

/* 📌 **İkonlar İçin Hover Efekti** */
.clickable {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.clickable:hover {
  transform: scale(1.5);
}

/* 📌 **Gönderme Butonu** */
.send-btn {
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.send-btn:hover {
  background-color: #0044cc;
}

/* 📌 **Mesaj Gönderme Dialogu** */
.dialog-card {
  width: 420px;
  padding: 10px;
  border-radius: 10px;
}

/* 📌 **Animasyonlu İkon** */
.animated-icon {
  animation: pulse 1.5s infinite alternate;
}

/* 📌 **Pulsing Efekti** */
@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

/* 📌 **Mobil Uyum** */
@media (max-width: 600px) {
  .contact-card {
    max-width: 90%;
  }

  .dialog-card {
    width: 90%;
  }

  .send-btn {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>
