<template>
  <div>
    <the-header v-if="user && user.step == 0" />
    <section class="card_section">
      <div class="container">
        <div class="template_main" id="main" v-if="user && user.step == 0">
          <the-left-sidebar />
          <!-- <nuxt-view v-slot="{ Component }"> -->
          <transition name="component-fade" mode="out-in">
            <Nuxt />
            <!-- <component :is="Component" /> -->
          </transition>
          <!-- </nuxt-view> -->
        </div>
      </div>
    </section>

    <!-- Modals -->
    <setting-modal />
  </div>
</template>

<script>
import TheHeader from '@/components/blocks/TheHeader.vue'
import TheLeftSidebar from '@/components/blocks/TheLeftSidebar.vue'
import SettingModal from '../components/modals/SettingModal.vue'

export default {
  components: {
    TheHeader,
    TheLeftSidebar,
    SettingModal,
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  watch: {
    user(value) {
      if (value && value.step !== 0) {
        this.$router.push({ path: '/questionnaire' })
      }
    },
  },
}
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
