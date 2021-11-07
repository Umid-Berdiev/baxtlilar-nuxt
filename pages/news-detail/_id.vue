<template>
  <section class="article_section">
    <div class="container">
      <img :src="getNewsDetail.image" />
      <h1>{{ getNewsDetail.title }}</h1>
      <p v-html="getNewsDetail.description" />
      <nuxt-link :to="localePath('/all-news')">
        <button class="link_blue">{{ $t("all_news") }}</button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "auth",
  auth: "guest",
  async asyncData({ params, store }) {
    const id = params.id;
    await store.dispatch("fetchNewsDetail", id);
  },
  computed: {
    ...mapGetters(["getNewsDetail"]),
  },
};
</script>
