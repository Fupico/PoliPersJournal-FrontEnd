<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <div class="text-primary" style="font-size: 30vh">404</div>

      <div class="text-h5 text-grey-7 q-mt-md">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        text-color="white"
        unelevated
        :to="previousPage ?? '/'"
        label="Go Back"
        no-caps
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const previousPage = ref<string | null>(null);

onMounted(() => {
  const backUrl = router.options.history.state.back;
  previousPage.value = typeof backUrl === "string" ? backUrl : null;
});
</script>
