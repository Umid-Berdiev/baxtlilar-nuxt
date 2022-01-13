<template>
  <section class="article_section">
    <div class="container">
      <h1>{{ termsOfUse.name }}</h1>
      <p v-html="termsOfUse.text" />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheFooter from "@/components/blocks/TheFooter.vue";

export default {
  layout: "auth",
  auth: "guest",
  components: { TheFooter },
  async created() {
    const keyword = 'terms_of_use';
    const lang = this.$i18n.locale;
    const response = await this.$axios.get("api/pages/one", {
      params: { keyword, lang },
    });

    this.termsOfUse = response.data
  },
  data() {
    return {
      termsOfUse: {}
    }
  },
  methods: {
    ...mapActions(["fetchFooterListOne"]),
  },
  computed: {
    ...mapGetters(["getFooterListOne"]),
  },
  async beforeDestroy() {
    this.$store.commit('isTermsReading', false);
  }
};
</script>
