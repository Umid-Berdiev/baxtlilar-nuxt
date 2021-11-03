<template>
  <!-- Slider main container -->
  <div class="swiper swiper_about">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <loader v-if="images.length == 0" />
      <!-- Slides -->
      <div
        class="swiper-slide"
        v-for="(item, index) in images"
        :key="index"
        v-else
      >
        <img :src="item.url" alt="image" />
      </div>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
  </div>

  <!-- <swiper
    :slides-per-view="1"
    :space-between="20"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="swiper_about"
  >
    <loader v-if="images.length == 0" />
    <swiper-slide v-for="(item, index) in images" :key="index" v-else>
      <img :src="item.url" alt="image" />
    </swiper-slide>
  </swiper> -->
</template>

<script>
// import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper.min.css'
import { mapActions, mapGetters } from 'vuex'
import Loader from '../Loader.vue'

export default {
  data() {
    return {
      images: [],
    }
  },
  props: {
    user_id: null,
  },
  components: {
    Loader,
  },
  async created() {
    this.images = await this.fetchUserImages({
      user_id: this.user_id,
      type: 'both',
    })
  },
  methods: {
    ...mapActions(['fetchUserImages']),
    onSwiper(swiper) {
      // console.log(swiper);
    },
    onSlideChange() {
      // console.log("slide change");
    },
  },
}
</script>

<style></style>
