<template>
  <header id="header">
    <div class="container">
      <div class="hdr_main">
        <nuxt-link to="/" class="logo">
          <img src="@/assets/images/logo.png" alt />
        </nuxt-link>
        <div class="sidebar_mobile" @click="closeMobileHeaderMenu">
          <ul class="list_header js-anchor-link">
            <li>
              <a href="/#how-does-it-work">{{ $t("how_it_works") }}</a>
            </li>
            <!-- <li><a href="javascript:;">{{ $t('tariffs') }}</a></li> -->
            <li>
              <a href="/#news">{{ $t("news") }}</a>
            </li>
            <li>
              <a href="/#faq-courses">{{ $t("questions") }}</a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          class="link_blue text-capitalize only_hdr"
          v-text="$t('signin')"
          @click="showModalFunc"
        />

        <a href="javascript:;" class="hamburger" @click="openMobileHeaderMenu">
          <img src="@/assets/images/hamburger.svg" alt />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import LoginModal from "@/components/modals/LoginModal.vue";

export default {
  components: { LoginModal },
  methods: {
    openMobileHeaderMenu() {
      document.getElementById("header")?.classList.add("opened");
    },
    closeMobileHeaderMenu() {
      document.getElementById("header")?.classList.remove("opened");
    },
    showModalFunc() {
      this.$bvModal.show("login-modal");
    },
  },
};
</script>
