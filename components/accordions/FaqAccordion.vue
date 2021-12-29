<template>
  <section class="faq">
    <div class="container">
      <h2 class="title">{{ $t("frequent_questions") }}</h2>
      <loader v-if="loading" />
      <div class="accordion" id="faq-accordion" v-else>
        <faq-card v-for="(item, index) in faqs" :key="index" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import FaqCard from "../cards/FaqCard.vue";
import Loader from "../Loader.vue";

export default {
  components: { Loader, FaqCard },
  data() {
    return {
      loading: false,
      faqs: []
    };
  },
  async fetch() {
    this.loading = true
    try {
      const response = await this.$axios.$get("api/chavo-list");
      this.faqs = response

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
};
</script>
