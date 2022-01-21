<template>
  <b-modal
    centered
    modal-class="language_popup_style"
    id="success-modal"
    ref="successModal"
    hide-header
    hide-footer
  >
    <div>
      <div v-if="!loading">
        <img
          width="150"
          v-if="success"
          src="~/assets/images/success.png"
          alt="Success"
        />
        <img width="150" v-else src="~/assets/images/fail.png" alt="Success" />
        <h2 v-text="text" class="mb-2" />
      </div>
      <button :disabled="loading" @click="hideModal" class="link_blue red">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        &nbsp;{{ $t("Close") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    text: String,
    success: Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    showModal() {
      this.$refs.successModal.show();
    },
    hideModal() {
      this.$refs.successModal.hide();
    },
  },
};
</script>

<style scoped>
.modal-content {
  background: white !important;
}
</style>
