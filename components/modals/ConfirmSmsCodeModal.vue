<template>
  <b-modal
    id="confirm-sms-code-modal"
    ref="confirmSmsCodeModal"
    centered
    hide-header
    hide-footer
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
          <button class="link_blue" :disabled="codeLoading">
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
        <div class="col-auto ms-auto">
          <button
            :disabled="codeSentStatus"
            class="btn ms-auto"
            @click="resendSms"
          >{{ $t("resend_sms") }}</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import authService from "~/plugins/services/auth.service";

export default {
  data() {
    return {
      modal: null,
      codeLoading: false,
      codeError: "",
      codeSentStatus: false,
      codeInfo: "",
    };
  },
  methods: {
    async submitCode() {
      this.codeError = "";
      this.codeLoading = true;

      try {
        const res = await this.$axios.post("api/sms-code-confirmation", {
          code: this.$refs.smsCode.value,
          phone: this.$store.getters.getGuest.phone,
        });

        if (res.data.status) {
          const res2 = await this.$auth.loginWith("laravelSanctum", {
            data: {
              username: this.$store.getters.getGuest.username,
              password: this.$store.getters.getGuest.password,
            },
          });

          await this.$store.dispatch("user/setAccessToken", res2.data.accessToken);
          this.$refs.confirmSmsCodeModal.hide();
          window.location.href = "/home";
          // this.$router.push(this.localePath("/home"));
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

      const response = await this.$axios.post("check-phone", {
        phone: this.phone,
      });

      if (response.data.status) {
        this.codeSentStatus = true;
        this.codeInfo = this.$t("Code sent");
        setTimeout(() => (this.codeSentStatus = true), 60000);
      }

      this.codeLoading = false;
    },
  },
  async mounted() {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      console.log('Modal is about to be shown', bvEvent, modalId)
    })
    // authService.logout()
  }
};
</script>

<style></style>
