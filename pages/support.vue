<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("support") }}</h1>
    <div class="support_top row">
      <div
        class="col-xl-4 col-lg-6 col-sm-4"
        v-for="(item, index) in getSupportCategoryWithChavos"
        :key="index"
      >
        <a class="support_top_item" @click="setChavos(item.support_chavos)">
          <img src="/src/assets/images/request.svg" alt="" />
          <h2>{{ item.name }}</h2>
        </a>
      </div>
    </div>
    <section class="faq">
      <div class="container">
        <div class="accordion" id="accordionExample">
          <faq-card v-for="(item, index) in chavos" :key="index" :item="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FaqCard from "@/components/cards/FaqCard.vue";
export default {
  components: { FaqCard },
  data() {
    return {
      chavos: [],
    };
  },
  async created() {
    await this.fetchSupportCategoryWithChavos();
    this.chavos = this.getSupportCategoryWithChavos[0].support_chavos;
  },
  methods: {
    ...mapActions(["fetchSupportCategoryWithChavos"]),
    setChavos(chavos) {
      console.log(chavos);
      this.chavos = chavos;
    },
  },
  computed: {
    ...mapGetters(["getSupportCategoryWithChavos"]),
  },
};
</script>

<style></style>
