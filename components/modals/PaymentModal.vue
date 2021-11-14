<template>
  <b-modal
    class="language_popup_style"
    id="payment-modal"
    ref="paymentModal"
    hide-header
    hide-footer
    centered
  >
    <div>
      <h1>{{ $t("Select Payment option") }}</h1>
      <div class="row">
        <img
          @click="paymentCreate('Click')"
          class="payment-option"
          src="~/assets/images/click.png"
          alt="Success"
        />
        <img
          @click="paymentCreate('Payme')"
          class="payment-option"
          src="~/assets/images/payme.png"
          alt="Success"
        />
      </div>
      <button :disabled="loading" @click="hideModal" class="link_blue red">
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm text-white"
        ></span>
        &nbsp;{{ $t("Close") }}
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
        $emit("paymentFailed", { isSuccess: res.status, text: res.message });
      }
    },
  },
};
</script>

<style scoped>
.payment-option {
  cursor: pointer;
}

.payment-option:hover {
  background: lightgray;
}

.modal-content {
  background: white !important;
}
</style>
