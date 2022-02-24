<template>
  <section class="news" id="news">
    <div class="container">
      <h2 class="title">{{ $t("news") }}</h2>
      <loader v-if="loading" />
      <template v-else>
        <div class="row">
          <div class="col-sm-4" v-for="(item, index) in news" :key="index">
            <news-card :item="item" />
          </div>
        </div>
        <div class="row justify-content-center pt-5">
          <div class="col-auto">
            <nuxt-link :to="localePath('/all-news')">
              <button class="link_blue">{{ $t("all_news") }}</button>
            </nuxt-link>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import NewsCard from "../cards/NewsCard.vue";
import Loader from "../Loader.vue";
import moment from "moment";

export default {
  components: { NewsCard, Loader },
  async fetch() {
    this.loading = true
    try {
      const response = await this.$axios.$get("api/news-list");
      this.news = response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(
        this.$i18n.t("error_while_fetching_data") + ": " + message
      );
    }
    this.loading = false
  },
  data() {
    return {
      loading: false,
      news: []
    };
  },
  methods: {
    formatDate(value) {
      return moment(value).format("H:i dd.mm.YYYY");
    },
  },
};
</script>
