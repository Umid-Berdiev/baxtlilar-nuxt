<template>
  <section class="anceta_main">
    <div class="container">
      <h1>{{ $t("questionnaire") }}</h1>
      <div class="anceta_wrapper">
        <transition name="component-fade" mode="out-in">
          <Nuxt />
        </transition>
        <questionnaire-right-sidebar />
      </div>
    </div>
  </section>
</template>

<script>
import QuestionnaireRightSidebar from "@/components/blocks/QuestionnaireRightSidebar.vue";

export default {
  components: {
    QuestionnaireRightSidebar,
  },
  mounted() {

    let nextPath = "/";

    if (this.user) {
      switch (this.user.step) {
        case 1:
          nextPath = "/questionnaire";
          break;
        case 2:
          nextPath = "/questionnaire/second-part";
          break;
        case 3:
          nextPath = "/questionnaire/third-part";
          break;
        case 4:
          nextPath = "/questionnaire/fourth-part";
          break;
        case 5:
          nextPath = "/questionnaire/fifth-part";
          break;
        case 6:
          nextPath = "/questionnaire/sixth-part";
          break;
        case 7:
          nextPath = "/questionnaire/seventh-part";
          break;
      }
    }
    this.$router.push(this.localePath(nextPath));
  },
  computed: {
    user() {
      return this.$auth.user;
    },
  },
};
</script>
