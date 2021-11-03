<template>
  <div class="anceta_form">
    <div class="steps_form">
      <div>1</div>
      <div class="active">{{ $t('additional') }} {{ $t('questions') }}</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
    <h2>{{ $t('questions_and_answers') }}</h2>
    <h2 class="text-center" v-if="getBlistQuestions.length == 0">
      {{ $t('no_questions') }}
    </h2>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-xl-7" v-for="item in getBlistQuestions" :key="item.id">
          <div class="form-group">
            <label for="">{{ item.questions }}</label>
            <textarea
              name="answers[]"
              :placeholder="$t('text') + '...'"
              v-model="answers[item.id]"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="anc_link_bottom">
        <button type="submit" class="link_blue">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp; {{ $t('next') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'questionnaire',
  mounted() {
    this.setQuestionnairePercent(20)
  },
  data() {
    return {
      loading: false,
      answers: [],
    }
  },
  computed: {
    ...mapGetters(['getBlistQuestions']),
  },
  created() {
    this.fetchBlistQuestions()
  },
  methods: {
    ...mapActions(['fetchBlistQuestions', 'saveUserAnswers']),
    ...mapMutations(['setQuestionnairePercent']),
    async submit(e) {
      this.loading = true
      const formData = new FormData(e.target)
      let form = Object.fromEntries(formData)
      const questionIds = this.getBlistQuestions.map((item) => item.id)
      form.answers = this.answers
      form.questionIds = questionIds
      try {
        await this.saveUserAnswers(form)
        this.loading = false
        this.$router.push({ path: '/fifth-part' })
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
