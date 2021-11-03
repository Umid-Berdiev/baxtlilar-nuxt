<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="link_blue text-capitalize only_hdr"
      v-text="$t('signin')"
      @click="showModalFunc"
    />

    <!-- Modal -->
    <div class="modal fade" ref="loginModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-transparent border-0">
          <div class="modal-body">
            <div id="enter_site_popup" class="popup_register_style">
              <h2 v-text="$t('signin')" class="text-capitalize"></h2>
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(handleLogin)">
                  <div class="form-group">
                    <ValidationProvider
                      rules="required"
                      name="Username"
                      v-slot="{ errors }"
                    >
                      <input
                        name="username"
                        v-model="form.username"
                        ref="username"
                        type="text"
                        :placeholder="$t('username')"
                      />
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <ValidationProvider
                      rules="required"
                      name="Password"
                      vid="password"
                      v-slot="{ errors }"
                    >
                      <input
                        name="password"
                        v-model="form.password"
                        type="password"
                        :placeholder="$t('password')"
                      />
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="forget_title">
                    {{ $t("forget_password") }}
                    <a
                      href="#resetPasswordModal"
                      @click="showResetPasswordModal"
                      >{{ $t("restore") }}</a
                    >
                  </div>
                  <div class="form-group text-center">
                    <button class="link_blue" :disabled="loading">
                      <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                      &nbsp;
                      <span
                        v-text="$t('signin')"
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
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
    <reset-pasword-modal ref="resetPasswordModal" id="resetPasswordModal" />
  </div>
</template>

<script>
// import { Form, Field, ErrorMessage } from 'vee-validate'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import * as yup from "yup";
import { Modal } from "bootstrap";
import ResetPaswordModal from "./ResetPaswordModal.vue";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    ResetPaswordModal,
  },
  data() {
    // const schema = yup.object().shape({
    //   username: yup.string().required(this.$t("Username is required!")),
    //   password: yup.string().required(this.$t("Password is required!")),
    // });

    return {
      loading: false,
      message: "",
      // schema,
      showModal: false,
      loginModal: null,
      form: {
        username: null,
        password: null,
      },
    };
  },
  mounted() {
    this.loginModal = new Modal(this.$refs.loginModal);
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.form.lang = this.$i18n.locale;

      try {
        await this.$auth.loginWith("laravelSanctum", {
          data: this.form,
        });

        this.loginModal.hide();
        if (data.message == "phone_number_not_verified") {
          this.$store.commit("setUserPhone", data.phone);

          // this.loginModal.hide();

          const smsConfirmModal = new Modal(
            document.getElementById("confirm-sms-code-modal")
          );

          smsConfirmModal.show();
        } else this.$router.push("/home");
      } catch (error) {
        this.message = this.$t("Credentials not match");
        // this.message =
        // (error.response &&
        //   error.response.data &&
        //   error.response.data.message) ||
        // error.message ||
        // error.toString();
      }

      this.loading = false;

      // this.$store.dispatch("auth/login", user).then(
      //   (data) => {
      //     this.loginModal.hide();
      //     if (data.message == "phone_number_not_verified") {
      //       this.$store.commit("setUserPhone", data.phone);

      //       // this.loginModal.hide();

      //       const smsConfirmModal = new Modal(
      //         document.getElementById("confirm-sms-code-modal")
      //       );

      //       smsConfirmModal.show();
      //     } else this.$router.push("/home");
      //   },
      //   (error) => {
      //     this.loading = false;
      //     this.message = this.$t("Credentials not match");
      //   }
      // );
    },
    showResetPasswordModal() {
      this.loginModal.hide();

      this.$refs.resetPasswordModal.showModalFunc();
    },
    showModalFunc() {
      this.loginModal.show();
      this.loginModal._element.addEventListener("shown.bs.modal", (e) => {
        this.$refs.username.focus();
      });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
