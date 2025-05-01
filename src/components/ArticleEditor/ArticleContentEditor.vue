<template>
  <q-card>
    <q-card-section>
      <h5 class="text-primary">{{ t("editor.title") }}</h5>
      <QuillEditor
        v-model:content="content"
        contentType="html"
        theme="snow"
        style="min-height: 400px"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import { useI18n } from "vue-i18n";
import { QuillEditor } from "@vueup/vue-quill";
import "quill/dist/quill.snow.css";

const { t } = useI18n();

// 📌 content dışarıdan alınabilir
const props = defineProps<{
  modelValue?: string;
}>();

// 📌 emit ile dışarı aktar
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const content = ref(props.modelValue || "");

// 📌 Giriş değiştikçe parent'a bildir
watch(content, (val) => {
  emit("update:modelValue", val);
});
</script>
