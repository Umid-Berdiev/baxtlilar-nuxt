<template>
  <footer class="main_ftr">
    <div class="container">
      <div class="ftr_top">
        <div class="row">
          <div class="col-sm-6">
            <nuxt-link to="/" class="logo">Baxtlilar</nuxt-link>
            <div class="socials">
              <a href="#">
                <icon-facebook />
              </a>
              <a href="#">
                <icon-instagram />
              </a>
              <a href="#">
                <icon-twitter />
              </a>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-lg-6">
                <ul>
                  <li v-for="(item, index) in getFooterList" :key="index">
                    <nuxt-link
                      :to="localePath('/article') + '/' + item.keyword"
                      @click="getOne(item.keyword)"
                    >
                      {{ item.name }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ftr_bottom">
        <p>2010-2020 Privacy-Terms</p>
        <p>Разработка <a href="#">BPM-Group.uz</a></p>
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
  async created() {
    await this.fetchFooterList(this.$i18n.locale);
  },
  methods: {
    ...mapActions(["fetchFooterList", "fetchFooterListOne"]),
    async getOne(keyword) {
      const lang = this.$i18n.locale;
      await this.fetchFooterListOne({ lang, keyword });
    },
  },
  computed: {
    ...mapGetters(["getFooterList"]),
  },
};
</script>
