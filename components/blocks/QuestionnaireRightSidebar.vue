<template>
  <div class="right_anceta">
    <a
      href="#"
      class="watching"
      data-fancybox
      data-src="https://www.youtube.com/watch?v=Jju2POnq7e8"
    >
      <img src="~/assets/images/play.svg" alt="" />
      {{ $t("watch_video") }}
    </a>
    <div class="progress_bar">
      <h5>{{ $t("questionnaire_degree") }} {{ getQuestionnairePercent }}%</h5>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="'width:' + getQuestionnairePercent + '%'"
          :aria-valuenow="getQuestionnairePercent"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ getQuestionnairePercent }}%
        </div>
      </div>
      <p>
        {{ $t("questionnaire_sidebar_text") }}
      </p>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  computed: {
    getQuestionnairePercent() {
      return this.$store.getters["questionnaire/getQuestionnairePercent"];
    },
  },
};
</script>
