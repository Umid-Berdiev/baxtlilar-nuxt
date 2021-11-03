<template>
  <section class="news" id="news">
    <div class="container">
      <h2 class="title">{{ $t("news") }}</h2>
      <loader v-if="loading" />
      <div class="row" v-else>
        <div
          class="col-sm-4 mb-3"
          v-for="(item, index) in newsList"
          :key="index"
        >
          <news-card :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NewsCard from "@/components/cards/NewsCard.vue";
import Loader from "@/components/Loader.vue";
import moment from "moment";

export default {
  layout: "auth",
  auth: "guest",
  components: { NewsCard, Loader },
  created() {
    this.fetchAllNews();
  },
  data() {
    return {
      loading: false,
      newsList: [],
      error: "",
    };
  },
  methods: {
    async fetchAllNews() {
      this.loading = true;

      try {
        const res = await this.$axios.get("api/all-news");
        this.newsList = res.data;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
    formatDate(value) {
      return moment(value).format("H:i dd.mm.YYYY");
    },
  },
  computed: {},
};
</script>
