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
          <input name="code" ref="smsCode" :placeholder="$t('Code')" />
          <span class="text-danger">{{ codeError }}</span>
        </div>
        <div class="form-group text-center">
          <button type="submit" class="link_blue" :disabled="codeLoading">
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
      countDown: 0
    };
  },
  methods: {
    async submitCode() {
      // console.log('submitCode clicked');
      this.codeError = "";
      this.codeLoading = true;

      try {
        const res = await this.$axios.post("api/sms-code-confirmation", {
          code: this.$refs.smsCode.value,
          phone: this.$store.getters.getGuest.phone,
        });

        if (res.data.status) {
          const res2 = await this.$auth.loginWith("local", {
            data: {
              username: this.$store.getters.getGuest.username,
              password: this.$store.getters.getGuest.password,
            },
          });

          // this.$auth.strategy.token.set(res2.data.accessToken);
          // await this.$store.dispatch("userModule/setAccessToken", res2.data.accessToken);
          this.$refs.confirmSmsCodeModal.hide();
          // window.location.href = "/home";
          this.$router.push(this.localePath("/home"));
        } else this.codeError = this.$t("Wrong code");
      } catch (error) {
        this.codeError = error.data;
      }

      this.codeLoading = false;
    },
    async resendSms() {
      this.codeLoading = true;
      this.codeError = "";
      this.codeInfo = "";

      try {
        const response = await this.$axios.post("api/check-phone", {
          phone: this.$store.state.user.userPhone,
          // phone: this.phone,
        });

        if (response.data.status) {
          this.$toast.info(this.$t("Code_sent"));
          // this.codeInfo = this.$t("Code_sent");
          this.countDown = 60;
          this.countDownTimer()
        }
      } catch (error) {
        this.codeError = error.data;
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
  mounted() {
    // this.countDownTimer()
  }
};
</script>

<style scoped>
.resend_sms_btn:focus {
  box-shadow: none;
}
</style>
