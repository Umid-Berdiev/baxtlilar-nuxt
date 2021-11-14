<template>
  <div>
    <TheMainHeader />
    <Nuxt />

    <!-- Modals -->
    <login-modal />
    <language-modal />
    <confirm-sms-code-modal />
    <reset-pasword-modal />
  </div>
</template>

<script>
import TheMainHeader from "@/components/blocks/TheMainHeader.vue";
import ConfirmSmsCodeModal from "@/components/modals/ConfirmSmsCodeModal.vue";
import LanguageModal from "~/components/modals/LanguageModal.vue";
import ResetPaswordModal from "~/components/modals/ResetPaswordModal.vue";
import LoginModal from "~/components/modals/LoginModal.vue";

export default {
  components: {
    TheMainHeader,
    ConfirmSmsCodeModal,
    LanguageModal,
    ResetPaswordModal,
    LoginModal,
  },
  data() {
    return {
      isGuest: false,
    };
  },
  mounted() {
    if (!localStorage.getItem("agreement")) this.$bvModal.show("lang-modal");
  },
};
</script>
