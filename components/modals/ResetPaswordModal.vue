<template>
  <div
    class="modal fade"
    ref="resetPasswordModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-transparent border-0">
        <div class="modal-body">
          <div id="enter_site_popup" class="popup_register_style">
            <h2 v-text="$t('modify_password')" class="text-capitalize"></h2>
            <form @submit.prevent="phoneSubmit">
              <div class="form-group">
                <input
                  ref="phone"
                  type="tel"
                  name="phone"
                  class="form-control"
                  pattern="^[\+][\d]{1,15}$"
                  :title="$t('should_start_with_plus')"
                  v-model="phone"
                  :placeholder="$t('Enter your phone number')"
                  :class="{ 'bg-light': phoneVerified }"
                  :disabled="phoneVerified"
                />
                <span class="text-danger">{{ phoneError }}</span>
              </div>
              <div class="form-group text-center" v-if="!phoneVerified">
                <button class="link_blue" :disabled="phoneLoading">
                  <span
                    v-show="phoneLoading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  &nbsp;
                  <span
                    v-text="$t('Send')"
                    class="text-capitalize text-white"
                  ></span>
                </button>
              </div>
            </form>
            <form v-if="phoneVerified" @submit.prevent="submitCode">
              <h5
                v-text="
                  $t(
                    'We sent the code to your number. Enter the code and a new password'
                  )
                "
                class="text-center text-muted"
              ></h5>
              <div class="form-group">
                <input name="code" v-model="code" :placeholder="$t('Code')" />
                <span class="text-danger">{{ codeError }}</span>
              </div>
              <div class="form-group">
                <input
                  name="password"
                  type="password"
                  v-model="password"
                  :placeholder="$t('password')"
                />
              </div>
              <div class="form-group text-center">
                <button class="link_blue" :disabled="codeLoading">
                  <span
                    v-show="codeLoading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  &nbsp;
                  <span
                    v-text="$t('Reset Password')"
                    class="text-capitalize text-white"
                  ></span>
                </button>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      phoneVerified: false,
      phoneLoading: false,
      codeLoading: false,
      message: "",
      phone: "",
      code: "",
      realCode: "",
      password: "",
      showModal: false,
      resetPasswordModal: {},
      phoneError: "",
      codeError: "",
    };
  },
  mounted() {
    this.resetPasswordModal = new Modal(this.$refs.resetPasswordModal);
  },
  methods: {
    ...mapActions(["fetchCheckPhone", "fetchCheckSmsCode"]),
    async phoneSubmit() {
      this.phoneError = "";
      if (this.phone.length != 17) {
        this.phoneError = this.$t("Wrong number");
      } else {
        this.phoneLoading = true;
        const res = await this.fetchCheckPhone(this.phone);
        if (res.status) {
          this.phoneVerified = true;
        } else {
          this.phoneError = this.$t("Wrong number");
        }
        this.phoneLoading = false;
      }
    },
    async submitCode() {
      this.codeError = "";
      this.codeLoading = true;
      const res = await this.fetchCheckSmsCode({
        code: this.code,
        phone: this.phone,
        password: this.password,
      });
      if (res.status) {
        this.$store.dispatch("auth/login", res).then(
          () => {
            // console.log("RESPONSE2");
            this.resetPasswordModal.hide();
            this.$router.push("/home");
          },
          (error) => {
            // console.log("ERROR2");
            this.loading = false;
            this.message = "Credentials not match";
          }
        );
      } else {
        this.codeError = this.$t("Wrong code");
      }
      this.codeLoading = false;
    },
    showModalFunc() {
      const vm = this;
      vm.resetPasswordModal.show();
    },
  },
};
</script>

<style></style>
