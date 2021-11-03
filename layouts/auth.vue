<template>
  <div>
    <TheMainHeader />
    <Nuxt />

    <!-- confirm modal -->
    <confirm-sms-code-modal />
  </div>
</template>

<script>
import TheMainHeader from "@/components/blocks/TheMainHeader.vue";
import ConfirmSmsCodeModal from "@/components/modals/ConfirmSmsCodeModal.vue";

export default {
  components: { TheMainHeader, ConfirmSmsCodeModal },
};
</script>
