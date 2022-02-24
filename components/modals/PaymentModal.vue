<template>
  <b-modal
    modal-class="language_popup_style"
    id="payment-modal"
    ref="paymentModal"
    hide-header
    hide-footer
    centered
  >
    <div class="my-lg-3">
      <h1 class="font-weight-bold">{{ $t("Select Payment option") }}</h1>
      <div class="row mb-3 justify-content-center">
        <img
          @click="paymentCreate('Click')"
          class="payment-option"
          src="~/assets/images/click.png"
          alt="Success"
          width="300"
        />
        <img
          @click="paymentCreate('Payme')"
          class="payment-option"
          src="~/assets/images/payme.png"
          alt="Success"
          width="300"
        />
      </div>
      <button :disabled="loading" @click="hideModal" class="link_blue red">
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm text-white"
        ></span>
        &nbsp;
        <span class="font-weight-bold">{{ $t("Close") }}</span>
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      modal: {},
      loading: false,
    };
  },
  props: {
    type: Number,
  },
  methods: {
    ...mapActions(["fetchCreatePayment"]),
    showModal() {
      this.$refs.paymentModal.show();
    },
    hideModal() {
      this.$refs.paymentModal.hide();
    },
    async paymentCreate(psystem) {
      this.loading = true;
      const user = this.$auth.user;
      const res = await this.fetchCreatePayment({
        type: this.type,
        user_id: user.id,
        psystem,
        lang: this.$i18n.locale,
      });
      this.loading = false;
      if (res.status) {
        location.assign(res.url);
      } else {
        this.$emit("paymentFailed", { isSuccess: res.status, text: res.message });
      }
    },
  },
};
</script>

<style scoped>
.payment-option {
  cursor: pointer;
  padding: 1rem;
  border-radius: 25px;
}

.payment-option:hover {
  background: lightgray;
}

.modal-content {
  background: white !important;
}
</style>
