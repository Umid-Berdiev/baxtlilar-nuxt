<template>
  <div>
    <TheMainHeader />
    <Nuxt />

    <!-- Modals -->
    <login-modal />
    <confirm-sms-code-modal />
    <reset-pasword-modal />
  </div>
</template>

<script>
import TheMainHeader from "@/components/blocks/TheMainHeader.vue";
import ConfirmSmsCodeModal from "@/components/modals/ConfirmSmsCodeModal.vue";
import ResetPaswordModal from "~/components/modals/ResetPaswordModal.vue";
import LoginModal from "~/components/modals/LoginModal.vue";

export default {
  components: {
    TheMainHeader,
    ConfirmSmsCodeModal,
    ResetPaswordModal,
    LoginModal,
  },
  data() {
    return {
      isGuest: false,
    };
  }
};
</script>
