<template>
  <form @submit.prevent="submit">
    <h2>{{ $t('passport_image') }}</h2>
    <img
      v-if="user.passport_image"
      id="passport_image"
      :src="APP_URL + user.passport_image"
      alt="User_passport"
    />
    <h5 v-else>{{ $t('passport_image_not_found') }}</h5>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for="">{{ $t('Choose Language') }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            class="form-control"
            @change="selectLocale"
            :default-value="$i18n.locale"
          >
            <a-select-option value="uz">{{ $t('Uzbek') }}</a-select-option>
            <a-select-option value="ru">{{ $t('Russian') }}</a-select-option>
            <a-select-option value="en">{{ $t('English') }}</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for="">{{ $t('new_password') }}</label>
          <input type="password" placeholder="........" v-model="password" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for="">{{ $t('rewrite_password') }}</label>
          <input type="password" placeholder="........" v-model="confirm" />
          <span class="text-danger">{{ error }}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <button type="submit" class="link_blue red">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp; {{ $t('save') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { Modal } from 'bootstrap'

export default {
  props: { user: Object },
  data() {
    return {
      password: '',
      confirm: '',
      error: '',
      loading: false,
      APP_URL: process.env.API_URL,
    }
  },
  methods: {
    ...mapActions(['fetchChangePassword']),
    async submit(e) {
      if (this.password != this.confirm) {
        this.error = this.$t('Не совподають')
      } else {
        this.error = ''
        this.loading = true
        await this.fetchChangePassword(this.confirm)
        this.loading = false
        const modal = Modal.getInstance(
          document.getElementById('setting-modal')
        )
        modal.show()
      }
    },
    selectLocale(locale) {
      localStorage.setItem('language', locale)
      this.$i18n.locale = locale
    },
  },
}
</script>

<style scoped>
#passport_image {
  width: 50%;
}
</style>
