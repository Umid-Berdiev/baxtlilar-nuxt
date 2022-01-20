<template>
  <b-modal
    id="login-modal"
    ref="loginModal"
    hide-header
    hide-footer
    @shown="focusEl"
  >
    <div class="popup_register_style">
      <h2 v-text="$t('signin')" class="text-capitalize"></h2>
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(userLogin)">
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
              <div class="error-feedback text-danger">{{ errors[0] }}</div>
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
              <div class="error-feedback text-danger">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="forget_title">
            {{ $t("forget_password") }}
            <a
              href="#"
              @click="showResetPasswordModal"
            >{{ $t("restore") }}</a>
          </div>
          <div class="form-group text-center">
            <button class="link_blue" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              &nbsp;
              <span
                v-text="$t('signin')"
                class="text-capitalize text-white"
              ></span>
            </button>
          </div>
          <div class="form-group">
            <div
              v-if="message"
              class="alert alert-danger"
              role="alert"
            >{{ message }}</div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
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
  methods: {
    async userLogin() {
      this.loading = true;
      this.form.lang = this.$i18n.locale;

      try {
        // const res = await this.$auth.loginWith("laravelSanctum", {
        //   data: this.form,
        // });

        // this.$auth.strategy.token.set(res.accessToken);

        this.$axios.get("/sanctum/csrf-cookie")
          .then(async (response) => {
            // this.$axios.post("/api/auth/login", this.form)
            //   .then(async (res) => {
            //     localStorage.setItem(
            //       "accessToken",
            //       JSON.stringify(res.data.accessToken)
            //     );

            //     this.$axios.setHeader('Authorization', `Bearer ${res.data.accessToken}`)
            //     const userInfo = await this.$axios.$get('/api/user')
            //     this.$auth.setUser(userInfo)
            //     this.$store.state.auth.loggedIn = true
            //     this.$router.push(this.localePath("/home"));
            //     this.$refs.loginModal.hide();
            //   }).catch(error => {
            //     const errorMessage =
            //       (error.response &&
            //         error.response.data &&
            //         error.response.data.message) ||
            //       error.toString();

            //     console.log("errorMessage : ", errorMessage);
            //   })

            let res = await this.$auth.loginWith('local', { data: this.form })
            this.$router.push(this.localePath("/home"));
            console.log(res)
          }).catch(error => {
            const errorMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.toString();

            console.log("errorMessage : ", errorMessage);
          });

      } catch (error) {
        error && console.log('error.response: ', error.response);

        const phone =
          (error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.phone)

        console.log('phone: ', phone);

        if (phone) {
          this.$store.commit("userModule/setUserPhone", phone);
          this.$refs.loginModal.hide();

          this.$bvModal.show('confirm-sms-code-modal');
        } else {
          this.message = this.$t("Credentials not match");
        }
      }

      this.loading = false;
    },
    showResetPasswordModal() {
      this.$refs.loginModal.hide();

      this.$bvModal.show("reset-password-modal");
    },
    close() {
      this.$emit("close");
    },
    focusEl() {
      this.$refs.username.focus();
    },
  },
};
</script>
