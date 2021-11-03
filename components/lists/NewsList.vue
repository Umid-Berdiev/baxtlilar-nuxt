<template>
  <section class="news" id="news">
    <div class="container">
      <h2 class="title">{{ $t("news") }}</h2>
      <loader v-if="loading" />
      <div class="row" v-else>
        <div class="col-sm-4" v-for="(item, index) in getNews" :key="index">
          <news-card :item="item" />
        </div>
        <div class="col-auto mx-auto mt-3">
          <nuxt-link :to="localePath('/all-news')">
            <button class="link_blue">{{ $t("all_news") }}</button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NewsCard from "../cards/NewsCard.vue";
import Loader from "../Loader.vue";
import moment from "moment";

export default {
  components: { NewsCard, Loader },
  async created() {
    this.loading = true;
    await this.fetchNews();
    this.loading = false;
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["fetchNews"]),
    formatDate(value) {
      return moment(value).format("H:i dd.mm.YYYY");
    },
  },
  computed: {
    ...mapGetters(["getNews"]),
  },
};
</script>
