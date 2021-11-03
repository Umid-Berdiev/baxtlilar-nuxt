<template>
  <div>
    <section class="enter_site">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="enter_site_left">
              <h1>
                {{ $t('find_happiness') }} <br />{{ $t('along_Baxtlilar') }}
              </h1>
              <p>{{ $t('site_for_seriously_relationships') }}</p>
              <a href="#">{{ $t('details') }}</a>
            </div>
          </div>
          <div class="col-lg-6">
            <register-form />
          </div>
        </div>
      </div>
    </section>

    <how-it-works id="how-does-it-work" />

    <news-list />

    <faq-accordion id="faq-courses" />

    <the-footer />

    <reset-pasword-modal ref="resetPasswordModal" />

    <language-modal v-if="isGuest" />
  </div>
</template>

<script>
import HowItWorks from '@/components/modals/HowItWorks.vue'
import FaqAccordion from '@/components/accordions/FaqAccordion.vue'
import NewsList from '@/components/lists/NewsList.vue'
import TheFooter from '@/components/blocks/TheFooter.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'
import ResetPaswordModal from '@/components/modals/ResetPaswordModal.vue'
import LanguageModal from '@/components/modals/LanguageModal.vue'

export default {
  layout: 'auth',
  components: {
    HowItWorks,
    FaqAccordion,
    NewsList,
    TheFooter,
    RegisterForm,
    ResetPaswordModal,
    LanguageModal,
  },
  data() {
    return {
      isGuest: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/home')
    }

    if (localStorage.getItem('language') === null && !this.loggedIn) {
      this.isGuest = true
    }
  },
}
</script>
