<template>
  <div class="swiper_about">
    <loading-bar v-if="images.length === 0" />
    <swiper ref="mainSwiper" :options="swiperOptions" class="swiper" v-else>
      <!-- <swiper-slide> -->
      <!-- </swiper-slide> -->
      <swiper-slide v-for="(item, index) in images" :key="index">
        <img :src="item.url" alt="image" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { mapActions } from "vuex";
import Loader from "../Loader.vue";
import "swiper/css/swiper.css";

export default {
  data() {
    return {
      images: [],
      swiperOptions: {
        slidesPerView: "auto",
        // spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  props: {
    user_id: null,
  },
  components: {
    Loader,
    Swiper,
    SwiperSlide,
  },
  async created() {
    this.images = await this.fetchUserImages({
      user_id: this.user_id,
      type: "both",
    });
  },
  computed: {
    swiper() {
      return this.$refs.mainSwiper.$swiper;
    },
  },
  methods: {
    ...mapActions(["fetchUserImages"]),
  },
};
</script>

<style scoped>
.swiper_about {
  width: -webkit-fill-available;
}
</style>
