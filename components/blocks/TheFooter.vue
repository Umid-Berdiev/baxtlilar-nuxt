<template>
  <footer class="main_ftr">
    <div class="container">
      <div class="ftr_top">
        <div class="row">
          <div class="col-sm-6">
            <nuxt-link to="/" class="logo">Baxtlilar</nuxt-link>
            <div class="socials">
              <a href="javascript:;">
                <icon-facebook />
              </a>
              <a href="javascript:;">
                <icon-instagram />
              </a>
              <a href="javascript:;">
                <icon-twitter />
              </a>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-lg-6">
                <ul>
                  <li v-for="(item, index) in list" :key="index">
                    <nuxt-link
                      :to="localePath('/article') + '/' + item.keyword"
                      @click="getOne(item.keyword)"
                    >{{ item.name }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ftr_bottom">
        <p>2010-2020 Privacy-Terms</p>
        <p>
          Разработка
          <a href="javascript:;">BPM-Group.uz</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IconFacebook from "../icons/IconFacebook.vue";
import IconInstagram from "../icons/IconInstagram.vue";
import IconTwitter from "../icons/IconTwitter.vue";

export default {
  components: { IconFacebook, IconInstagram, IconTwitter },
  async fetch() {
    this.loading = true
    try {
      const response = await this.$axios.$get("api/pages/list?lang=" + this.$i18n.locale);
      this.list = response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(
        this.$i18n.t("error_while_fetching_data") + ": " + message
      );
    }
    this.loading = false
  },
  data() {
    return {
      list: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters(["getFooterList"]),
  },
  methods: {
    ...mapActions(["fetchFooterList", "fetchFooterListOne"]),
    async getOne(keyword) {
      const lang = this.$i18n.locale;
      await this.fetchFooterListOne({ lang, keyword });
    },
  },
};
</script>
