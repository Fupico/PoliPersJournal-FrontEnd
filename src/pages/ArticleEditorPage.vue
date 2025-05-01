<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <h4 class="text-h5">Makale İçeriği</h4>

        <QuillEditor
          theme="snow"
          v-model:content="content"
          contentType="html"
          style="height: 300px"
        />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <h6 class="text-subtitle1">HTML Çıktısı:</h6>
        <q-banner class="bg-grey-2 q-pa-md" dense>
          <pre>{{ content }}</pre>
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { QuillEditor } from "vue3-quill";

const content = ref("<p><strong>Merhaba!</strong> Bu bir test içeriğidir.</p>");
</script>
