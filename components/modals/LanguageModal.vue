<template>
  <b-modal ref="languageModal" id="lang-modal" hide-footer no-close-on-backdrop>
    <template #modal-header>
      <h2>{{ $t("choose_language") }}</h2>
    </template>
    <img src="~/assets/images/lang_logo.jpg" alt="" class="img_logo_lang" />
    <form @submit.prevent="handleSubmit">
      <div class="form-group select_language">
        <input type="radio" id="lang2" v-model="lang" value="uz" />
        <label for="lang2">UZ</label>
        <input type="radio" id="lang1" v-model="lang" value="ru" />
        <label for="lang1">RU</label>
        <input type="radio" id="lang3" v-model="lang" value="en" />
        <label for="lang3">EN</label>
      </div>
      <div class="form-group checkbox_style">
        <input
          type="checkbox"
          id="customCheck1"
          v-model="agreement"
          :value="true"
        />
        <label for="customCheck1"
          >{{ $t("condition_text") }}
          <a href="#">{{ $t("condition") }}</a></label
        >
        <span class="text-danger" v-show="errorVisibility">{{
          $t("condition_required")
        }}</span>
      </div>
      <button type="submit" class="link_blue">{{ $t("accept") }}</button>
    </form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      // languageModal: null,
      lang: "uz",
      agreement: false,
      errorVisibility: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.agreement) {
        localStorage.setItem("agreement", true);
        this.$i18n.setLocale(this.lang);
        this.$refs.languageModal.hide();
        this.errorVisibility = false;
      } else {
        this.errorVisibility = true;
      }
    },
  },
};
</script>
