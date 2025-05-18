<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- 📚 Son Makaleler (sağ panel) -->
      <div class="col-12">
        <!-- Buraya Slider Gelecek -->
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            v-for="item in slideList"
            :key="item.name"
            :name="item.name"
            :img-src="item.image"
            class="animated-zoom"
          >
            <div class="overlay-container">
              <div class="text-overlay">
                <p class="text-bold text-h6">{{ item.title }}</p>
                <p class="text-body1">{{ item.description }}</p>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-12 col-md-8">
        <LatestArticles :articles="articles" />
      </div>

      <!-- 🗂️ Kategori Listesi (sol panel) -->
      <div class="col-12 col-md-4">
        <CategoryList />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import LatestArticles from "src/components/LatestArticles.vue";
import CategoryList from "src/components/CategoryList.vue";
import { useI18n } from "vue-i18n";

const { t, locale, messages } = useI18n();

//Slider
const slide = ref(1);
const autoplay = ref(true);
const slideList = ref([
  {
    name: 1,
    image: "/images/slider7.png",
    title: "2025 ALMANYA SEÇİM SONUÇLARI DETAYLI DEĞERLENDİRMESİ",
    description: `"Almanya 2025 yılında tarihinde görülmemiş bir seçimi geride bıraktı. Yalnızca hükümet değişime değil, kültürel ve tarihsel anlamda da yapısal köklü değişikliklere sebep olan son seçimlerin sonuçlarını tüm detaylarıyla inceliyoruz.

`,
  },
  {
    name: 2,
    image: "/images/slider8.jpg",
    title: "Almanya Enerji Dönüşüm Süreci",
    description: `"1970’lerden günümüze kadar olan 55 yıllık bu süreçte Almanya sürdürülebilir enerji ve yeşile dönüş projeleri kapsamında öncü dünya ülkelerinden biri olmuştur. Yenilenebilir enerji dönüşümü kapsamında 1970’lerdeki enerji krizinden doğru şekilde ders çıkararak geleceğin en önemli alanlarından biri olan “yenilenebilir enerji” kaynaklarına sürekli olarak yatırımlarını arttırmıştır. `,
  },
]);
// 🌐 Dil bazlı article verileri
const articles = computed(() => {
  const currentLocale = locale.value;
  const data = messages.value[currentLocale]?.articles;
  if (Array.isArray(data)) return data;
  console.error("Articles key is not an array or undefined:", data);
  return [];
});
</script>

<style scoped>
/* Ekstra responsive iyileştirme istersen burada yapabilirsin */
@keyframes zoom-animation {
  0% {
    transform: scale(1); /* Normal boyut */
  }

  100% {
    transform: scale(1.1); /* Eski boyuta dönüş */
  }
}

.animated-zoom {
  position: relative;
  overflow: hidden; /* Görüntü taşmasını engellemek için */
  background-size: cover; /* Arka planı tam kapla */
  background-position: center; /* Ortala */
  animation: zoom-animation 10s infinite; /* Sürekli yakınlaşma animasyonu */
  transform-origin: center; /* Ölçekleme merkezi */
}

.overlay-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 5%;
  width: 40%; /* Sol tarafın genişliği */
  height: 50%;
  background-color: rgba(76, 74, 74, 0.5); /* %70 şeffaf siyah arka plan */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Metni dikey ortala */
  padding: 20px; /* Metin kenar boşluğu */
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .text-overlay {
    width: 100%; /* Tam genişlik */
    height: 40%; /* Alt kısmın yüksekliği */
    top: auto;
    bottom: 10%; /* Alt kısma yerleştir */
    left: 0;
    justify-content: flex-end; /* Metni alt kısma hizala */
  }
}

@media (max-width: 520px) {
  .text-overlay {
    width: 100%; /* Tam genişlik */
    height: 60%; /* Alt kısmın yüksekliği */
    top: auto;
    bottom: 10%; /* Alt kısma yerleştir */
    left: 0;
    justify-content: flex-end; /* Metni alt kısma hizala */
  }
}
</style>
