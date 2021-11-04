<template>
  <section class="article_section">
    <div class="container">
      <img :src="getNewsDetail.image" alt="" />
      <h1>{{ getNewsDetail.title }}</h1>
      <p v-html="getNewsDetail.description" />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "auth",
  auth: "guest",
  components: { TheFooter },
  async created() {
    const id = this.$route.params.id;
    await this.fetchNewsDetail(id);
  },
  methods: {
    ...mapActions(["fetchNewsDetail"]),
  },
  computed: {
    ...mapGetters(["getNewsDetail"]),
  },
};
</script>
