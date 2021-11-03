<template>
  <section class="anceta_main">
    <div class="container">
      <h1>{{ $t('questionnaire') }}</h1>
      <div class="anceta_wrapper">
        <!-- <nuxt-view v-slot="{ Component }"> -->
        <transition name="component-fade" mode="out-in">
          <Nuxt />

          <!-- <component :is="Component" /> -->
        </transition>
        <!-- </nuxt-view> -->
        <questionnaire-right-sidebar />
      </div>
    </div>
  </section>
</template>

<script>
import QuestionnaireRightSidebar from '@/components/blocks/QuestionnaireRightSidebar.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionnaireRightSidebar,
  },
  async created() {
    await this.$store.dispatch('auth/fetchUserInfo')
  },
  mounted() {
    history.pushState(null, null, location.href)
    window.onpopstate = function () {
      history.go(1)
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  watch: {
    user(value) {
      let nextPath = '/'

      if (value) {
        switch (value.step) {
          case 1:
            nextPath = '/questionnaire'
            break
          case 2:
            nextPath = '/second-part'
            break
          case 3:
            nextPath = '/third-part'
            break
          case 4:
            nextPath = '/fourth-part'
            break
          case 5:
            nextPath = '/fifth-part'
            break
          case 6:
            nextPath = '/sixth-part'
            break
          case 7:
            nextPath = '/seventh-part'
            break
        }
      }
      this.$router.push({ path: nextPath })
    },
  },
}
</script>

<style></style>
