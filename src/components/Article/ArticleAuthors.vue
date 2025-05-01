<template>
  <q-card v-if="authors.length > 0" class="q-mt-md shadow-3 author-main-card">
    <q-card-section>
      <div class="column q-gutter-lg">
        <q-card
          v-for="author in authors"
          :key="author.id"
          flat
          bordered
          class="author-card q-pa-md row items-center no-wrap"
        >
          <div v-if="author.avatar" class="col-auto avatar-section">
            <div class="avatar-background">
              <q-avatar size="100px" class="avatar-border">
                <img
                  :src="author.avatar"
                  alt="Yazar"
                  @error="onImageError($event)"
                />
              </q-avatar>
            </div>
          </div>

          <div class="col q-ml-lg">
            <q-badge color="blue-1" text-color="blue-10" class="q-mb-sm">
              <q-icon name="verified" class="q-mr-xs" />
              {{ t("article.authorRole") }}
            </q-badge>

            <!-- ✅ Yönlendirme slug üzerinden -->
            <RouterLink
              :to="`/author/${author.profileLink}`"
              class="text-primary no-decoration"
            >
              <div class="text-h6 text-weight-bold hover-underline">
                {{ author.name }}
              </div>
            </RouterLink>

            <q-badge
              v-if="author.university"
              color="grey-2"
              text-color="grey-8"
              class="q-mt-xs q-mb-sm"
            >
              <q-icon name="school" size="xs" class="q-mr-xs" />
              {{ author.university }}
            </q-badge>

            <div
              v-if="author.bio"
              class="author-bio text-italic text-grey-9 q-mt-sm"
            >
              <q-icon name="format_quote" size="xs" class="q-mr-xs" />
              {{ author.bio }}
            </div>
          </div>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
import { useArticleAuthorsStore } from "src/stores/Article/articleAuthors";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t, locale } = useI18n();

const articleAuthorsStore = useArticleAuthorsStore();
const { authors } = storeToRefs(articleAuthorsStore);
const defaultAvatar = ref(
  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
);

const fetchAuthors = () => {
  const slug = route.params.slug as string;
  if (slug) articleAuthorsStore.fetchArticleAuthors(slug);
};

const onImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = defaultAvatar.value;
};

onMounted(fetchAuthors);
watch(() => route.params.slug, fetchAuthors);
watch(() => locale.value, fetchAuthors);
</script>

<style scoped>
.author-main-card {
  border-radius: 16px;
  background: linear-gradient(to bottom right, #ffffff, #f0f4ff);
  padding: 16px;
}

.author-card {
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  flex-wrap: wrap; /* ✅ wrap ekledik */
}

.author-card:hover {
  transform: translateY(-2px);
  background: #f9fbff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.avatar-border {
  border: 3px solid #1976d2;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s;
}
.avatar-border:hover {
  transform: scale(1.05);
}

.avatar-background {
  padding: 8px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 50%;
}

.avatar-section {
  flex-shrink: 0; /* ✅ resim alanı sabit kalsın */
}

.author-card .col {
  min-width: 0; /* ✅ metinler taşmasın */
}

.text-h6,
.author-bio {
  word-wrap: break-word;
  word-break: break-word;
}

.hover-underline:hover {
  text-decoration: underline;
}
.no-decoration {
  text-decoration: none;
}

.author-bio {
  border-left: 4px solid #90caf9;
  padding-left: 12px;
}
</style>
