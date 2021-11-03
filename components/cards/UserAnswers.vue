<template>
  <div>
    <h1>{{ $t('answers') }}</h1>
    <loader v-if="loading" />
    <h3 v-else-if="answers.length == 0" class="text-center">
      {{ $t('empty_data') }}
    </h3>
    <!-- <template v-for="answer in answers" v-else>
      <h2 :key="answer.id + '-h2'">{{ answer.question?.questions }}</h2>
      <p :key="answer.id + '-p'">{{ answer.answer }}</p>
    </template> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Loader from '../Loader.vue'
export default {
  components: { Loader },
  props: {
    answers: [],
  },
  data() {
    return {
      loading: false,
      // answers: [],
    }
  },
  // mounted() {
  //   this.loading = true;
  //   console.log("from UserAnswer: ", this.user_id);
  //   this.loading = false;
  // },
  methods: {
    ...mapActions(['fetchAnswers']),
  },
}
</script>
