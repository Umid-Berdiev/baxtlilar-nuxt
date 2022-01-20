<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form
      @submit.prevent="handleSubmit(handleRegister)"
      class="enter_site_right"
    >
      <div class="form-group">
        <div class="radio_male">
          <input type="radio" v-model="gender" id="boy" :value="1" />
          <label for="boy">
            <img src="@/assets/images/boy.svg" alt />
            {{ $t("male") }}
          </label>
          <input type="radio" v-model="gender" id="girl" :value="2" />
          <label for="girl">
            <img src="@/assets/images/girl.svg" alt />
            {{ $t("female") }}
          </label>
        </div>
        <span name="gender" class="error-feedback" />
      </div>
      <ValidationProvider
        name="username"
        :rules="rules.username"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <input
            :type="fieldTypes.username"
            v-model="username"
            class="form-control"
            :placeholder="$t('create_login')"
          />
          <span class="error-feedback">{{ errors[0] }}</span>
          <span
            class="error-feedback"
            v-if="backendErrors.username && backendErrors.username.length > 0"
            v-text="backendErrors.username[0]"
          ></span>
          <!-- <div
            class="invalid-feedback d-block"
            v-if="backendErrors.username && backendErrors.username.length > 0"
            v-text="backendErrors.username[0]"
          ></div>-->
        </div>
      </ValidationProvider>
      <ValidationProvider name="phone" :rules="rules.phone" v-slot="{ errors }">
        <div class="form-group">
          <input
            :type="fieldTypes.phone"
            v-model="phone"
            class="form-control"
            :placeholder="$t('Enter your phone number')"
          />
          <span class="error-feedback">{{ errors[0] }}</span>
          <span
            class="error-feedback"
            v-if="backendErrors.phone && backendErrors.phone.length > 0"
            v-text="backendErrors.phone[0]"
          ></span>
        </div>
      </ValidationProvider>
      <ValidationProvider
        name="password"
        :rules="rules.password"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <input
            :type="fieldTypes.password"
            @focus="handleType"
            @blur="handleType"
            v-model="password"
            class="form-control"
            :placeholder="$t('create_password')"
            autocomplete="off"
          />
          <span class="error-feedback" v-text="errors[0]" />
        </div>
      </ValidationProvider>

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
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loading: false,
      backendErrors: {
        username: [],
        phone: [],
      },
      gender: 1,
      username: "",
      phone: "",
      password: "",
      rules: {
        username: { required: true, regex: /^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{4,20}$/ },
        phone: { required: true, regex: /^[\+][\d]{1,15}$/ },
        password: { required: true, min: { length: 6 }, max: { length: 40 } }
      },
      fieldTypes: {
        username: 'text',
        phone: 'tel',
        password: 'password',
      }
    };
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      const form = {
        lang: this.$i18n.locale,
        gender: this.gender,
        username: this.username,
        phone: this.phone,
        password: this.password,
      };

      this.backendErrors = {
        username: [],
        phone: [],
      };

      try {
        const res = await this.$axios.$post("api/auth/register", form);
        if (res.message == "Success") {
          this.message = res.message;

          this.$store.commit("setGuest", {
            username: form.username,
            password: form.password,
            phone: form.phone,
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
    handleType(event) {
      const { srcElement, type } = event;
      const { name, value } = srcElement;

      if (type === 'blur' && !value) {
        this.fieldTypes[name] = 'text'
      } else {
        this.fieldTypes[name] = 'password'
      }
    }
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
