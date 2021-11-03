<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import * as yup from 'yup'

export default {
  components: {
    ValidationProvider,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required(this.$t('Username is required!')),
      password: yup.string().required(this.$t('Password is required!')),
    })

    return {
      loading: false,
      message: '',
      schema,
      showModal: false,
    }
  },
  mounted() {
    // this.focusInput();
  },
  methods: {
    handleLogin(user) {
      this.loading = true

      this.$store.dispatch('auth/login', user).then(
        () => {
          this.$router.push('/home')
        },
        (error) => {
          this.loading = false
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    },
    focusInput() {
      this.$refs.username.$el.focus()
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
