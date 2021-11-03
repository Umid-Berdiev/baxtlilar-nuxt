<template>
  <div
    class="modal fade language_popup_style"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="paymentModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header"></div>
        <div>
          <div class="modal-body">
            <h1>{{ $t('Select Payment option') }}</h1>
            <div class="row">
              <img
                @click="paymentCreate('Click')"
                class="payment-option"
                src="../../assets/images/click.png"
                alt="Success"
              />
              <img
                @click="paymentCreate('Payme')"
                class="payment-option"
                src="../../assets/images/payme.png"
                alt="Success"
              />
            </div>
          </div>
          <button :disabled="loading" @click="hideModal" class="link_blue red">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm text-white"
            ></span>
            &nbsp;{{ $t('Close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      modal: {},
      loading: false,
    }
  },
  props: {
    type: Number,
  },
  mounted() {
    this.modal = new Modal(this.$refs.paymentModal)
  },
  methods: {
    ...mapActions(['fetchCreatePayment']),
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    async paymentCreate(psystem) {
      this.loading = true
      const user = this.$auth.user
      const res = await this.fetchCreatePayment({
        type: this.type,
        user_id: user.id,
        psystem,
        lang: this.$i18n.locale,
      })
      this.loading = false
      if (res.status) {
        location.assign(res.url)
      } else {
        $emit('paymentFailed', { isSuccess: res.status, text: res.message })
      }
    },
  },
}
</script>

<style scoped>
.payment-option {
  cursor: pointer;
}
.payment-option:hover {
  background: lightgray;
}
</style>
