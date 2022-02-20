<template>
  <div>
    <h1>{{ $t("answers") }}</h1>
    <loader v-if="loading" />
    <h3
      v-else-if="answers.length == 0"
      class="text-center"
    >{{ $t("empty_data") }}</h3>
    <template v-for="answer in answers" v-else>
      <template v-if="answer.question">
        <h2>{{ answer.question && answer.question.questions }}</h2>
        <p>{{ answer.answer }}</p>
      </template>
    </template>
  </div>
</template>

<script>
import Loader from "../Loader.vue";

export default {
  components: { Loader },
  props: {
    answers: [],
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>
