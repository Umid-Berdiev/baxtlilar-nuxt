<template>
  <b-modal
    id="confirm-sms-code-modal"
    ref="confirmSmsCodeModal"
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
  >
    <div id="enter_site_popup" class="popup_register_style">
      <form @submit.prevent="submitCode">
        <h5
          v-text="$t('We sent the code to your number. Enter the code')"
          class="text-center text-muted"
        ></h5>
        <div class="form-group">
          <input
            type="text"
            name="code"
            v-model="smsCode"
            :placeholder="$t('Code')"
          />
          <span class="text-danger">{{ codeError }}</span>
        </div>
        <div class="form-group text-center">
          <button
            type="submit"
            class="link_blue"
            :disabled="codeLoading || smsCode === ''"
          >
            <span v-show="codeLoading" class="spinner-border spinner-border-sm"></span>
            &nbsp;
            <span
              v-text="$t('Confirm code')"
              class="text-capitalize text-white"
            ></span>
          </button>
        </div>
      </form>
      <div class="row">
        <div class="col-auto">
          <span class="text-success">{{ codeInfo }}</span>
        </div>
        <div class="col-auto ml-auto">
          <button
            :disabled="countDown > 0"
            class="btn ml-auto resend_sms_btn"
            @click="resendSms"
            type="button"
          >{{ $t("resend_sms") }} {{ countDown > 0 ? countDown : '' }}</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      modal: null,
      codeLoading: false,
      codeError: "",
      codeSentStatus: false,
      codeInfo: "",
      countDown: 0,
      smsCode: ""
    };
  },
  methods: {
    async submitCode() {
      console.log('submitCode clicked');

      try {
        this.codeError = "";
        this.codeLoading = true;
        const code = this.smsCode
        const phone = this.$store.getters.getGuest.phone

        const res = await this.$axios.$post("/api/sms-code-confirmation", {
          code,
          phone,
        });

        if (res.status === true) {
          const res2 = await this.$auth.loginWith("local", {
            data: {
              username: this.$store.getters.getGuest.username,
              password: this.$store.getters.getGuest.password,
            },
          });

          this.$refs.confirmSmsCodeModal.hide();
          this.$router.push(this.localePath("/home"));
        } else this.codeError = this.$t("Wrong code");
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message ||
            error.toString())

        this.codeError = message
      } finally {
        this.codeLoading = false;
      }
    },
    async resendSms() {
      this.codeLoading = true;
      this.codeError = "";
      this.codeInfo = "";

      try {
        const response = await this.$axios.$post("api/check-phone", {
          phone: this.$store.getters.getGuest.phone,
        });

        if (response.status) {
          this.$toast.info(this.$t("Code_sent"));
          // this.codeInfo = this.$t("Code_sent");
          this.countDown = 60;
          this.countDownTimer()
        } else {
          this.codeError = 'smth went Wrong'
        }
      } catch (error) {
        this.codeError = error;
      }

      this.codeLoading = false;
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  },
};
</script>

<style scoped>
.resend_sms_btn:focus {
  box-shadow: none;
}
button:disabled {
  cursor: not-allowed;
}

button.link_blue:disabled:hover {
  background: #1890ff !important;
}
</style>
