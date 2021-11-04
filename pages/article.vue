<template>
  <section class="article_section">
    <div class="container">
      <!-- <img :src="getFooterListOne.image" alt="" /> -->
      <h1>{{ getFooterListOne.name }}</h1>
      <p v-html="getFooterListOne.text" />
    </div>
  </section>
  <!-- <the-footer /> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheFooter from "@/components/blocks/TheFooter.vue";

export default {
  layout: "auth",
  auth: "guest",
  components: { TheFooter },
  async created() {
    const keyword = this.$route.params.key;
    const lang = this.$i18n.locale;
    await this.fetchFooterListOne({ keyword, lang });
    // console.log();
  },
  methods: {
    ...mapActions(["fetchFooterListOne"]),
  },
  computed: {
    ...mapGetters(["getFooterListOne"]),
  },
};
</script>
