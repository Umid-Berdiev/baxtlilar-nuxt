<template>
  <section class="faq">
    <div class="container">
      <h2 class="title">{{ $t("frequent_questions") }}</h2>
      <loader v-if="loading" />
      <div class="accordion" id="faq-accordion" v-else>
        <faq-card v-for="(item, index) in getFaq" :key="index" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FaqCard from "../cards/FaqCard.vue";
import Loader from "../Loader.vue";
export default {
  components: { Loader, FaqCard },
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    await this.fetchFaq();
    this.loading = false;
  },
  methods: {
    ...mapActions(["fetchFaq"]),
  },
  computed: {
    ...mapGetters(["getFaq"]),
  },
};
</script>
