<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="handleRegister" class="enter_site_right" ref="form">
      <!-- <div v-if="!successful"> -->
      <div class="form-group">
        <div class="radio_male">
          <input
            type="radio"
            name="gender"
            id="boy"
            :value="1"
            v-model="form.gender"
          />
          <label for="boy">
            <img src="@/assets/images/boy.svg" alt />
            {{ $t("male") }}
          </label>
          <input
            type="radio"
            name="gender"
            id="girl"
            :value="2"
            v-model="form.gender"
          />
          <label for="girl">
            <img src="@/assets/images/girl.svg" alt />
            {{ $t("female") }}
          </label>
        </div>
        <span name="gender" class="error-feedback" />
      </div>
      <div class="form-group">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input
            ref="username"
            v-model="form.username"
            name="username"
            type="text"
            class="form-control"
            :placeholder="$t('create_login')"
          />
          <span class="error-feedback" v-text="errors[0]" />
          <div
            class="invalid-feedback d-block"
            v-if="backendErrors.username && backendErrors.username.length > 0"
            v-text="backendErrors.username[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form-group">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input
            type="tel"
            name="phone"
            class="form-control"
            pattern="^[\+][\d]{1,15}$"
            :placeholder="$t('Enter your phone number')"
            v-model="form.phone"
          />
          <span class="error-feedback">{{ errors[0] }}</span>
          <div
            class="invalid-feedback d-block"
            v-if="backendErrors.phone && backendErrors.phone.length > 0"
            v-text="backendErrors.phone[0]"
          />
        </ValidationProvider>
      </div>

      <div class="form-group">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input
            v-model="form.password"
            name="password"
            type="password"
            class="form-control"
            :placeholder="$t('create_password')"
          />
          <span class="error-feedback" v-text="errors[0]" />
        </ValidationProvider>
      </div>

      <div class="form-group">
        <button
          type="submit"
          class="btn btn-primary btn-block"
          :disabled="loading || invalid"
        >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          &nbsp;
          {{ $t("signup") }}
        </button>
      </div>
      <!-- </div> -->
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import * as yup from "yup";
// import { Modal } from "bootstrap";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required(this.$t("Required field"))
        .trim()
        .matches(
          /^[a-zA-Z][\w-_]{3,19}$/,
          this.$t("validate_english_character")
        ),
      phone: yup.string().required(this.$t("Required field")),
      gender: yup.number().positive().integer(),
      password: yup
        .string()
        .required(this.$t("Required field"))
        .min(6, this.$t("validate_character_6"))
        .max(40, this.$t("validate_character_40")),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      // gender: 1,
      backendErrors: {
        username: [],
        phone: [],
      },
      phone: "",
      phoneVerified: false,
      error: "",
      form: { gender: 1 },
    };
  },
  methods: {
    async handleRegister() {
      this.backendErrors = {
        username: [],
        phone: [],
      };
      this.message = "";
      // this.successful = false;
      this.loading = true;
      this.form.lang = this.$i18n.locale;

      try {
        const res = await this.$axios.$post("api/auth/register", this.form);
        if (res.message == "Success") {
          this.message = res.message;

          this.$store.commit("setGuest", {
            username: this.form.username,
            password: this.form.password,
            phone: this.form.phone,
          });

          this.$bvModal.show('confirm-sms-code-modal');
        } else {
          this.backendErrors = { ...res.errors };
        }
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.$toast.error(
          this.$t("error_while_fetching_data") + ": " + message
        );
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
#myToastEl {
  background: #1890ff;
}
#toastPlacement {
  z-index: 1061;
}
</style>
