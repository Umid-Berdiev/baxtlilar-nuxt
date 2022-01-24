<template>
  <div>
    <the-header />
    <section class="card_section">
      <div class="container">
        <div class="template_main" id="main">
          <the-left-sidebar />
          <transition name="component-fade" mode="out-in">
            <Nuxt />
          </transition>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <setting-modal />
  </div>
</template>

<script>
import TheHeader from "@/components/blocks/TheHeader.vue";
import TheLeftSidebar from "@/components/blocks/TheLeftSidebar.vue";
import SettingModal from "../components/modals/SettingModal.vue";

export default {
  components: {
    TheHeader,
    TheLeftSidebar,
    SettingModal,
  },
};
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
