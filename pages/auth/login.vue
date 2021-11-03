<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">{{ $t('usernamed') }}</label>
          <ValidateProvider v-slot="{ errors }">
            <input
              v-model="form.username"
              name="username"
              ref="username"
              type="text"
              class="form-control"
            />
            <span name="username" class="error-feedback" v-text="errors[0]" />
          </ValidateProvider>
        </div>
        <div class="form-group">
          <label for="password">{{ $t('password') }}</label>
          <ValidateProvider>
            <input
              v-model="form.password"
              name="password"
              type="password"
              class="form-control"
            />
            <span name="password" class="error-feedback" v-text="errors[0]" />
          </ValidateProvider>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>{{ $t('login') }}</span>
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
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import * as yup from 'yup'

export default {
  layout: 'auth',
  components: {
    Form,
    Field,
    ErrorMessage,
    ValidationProvider,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required(this.$t('Required field')),
      password: yup.string().required(this.$t('Required field')),
    })

    return {
      loading: false,
      message: '',
      schema,
      error: null,
      loading: false,
      form: {
        username: null,
        password: null,
      },
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/home')
    }

    this.$refs.username.$el.focus()
  },
  methods: {
    async handleLogin() {
      this.loading = true
      try {
        await this.$auth.loginWith('laravelSanctum', {
          data: this.form,
        })
        this.$router.push('/home')
      } catch (e) {
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      }
      this.loading = false
    },
  },
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
