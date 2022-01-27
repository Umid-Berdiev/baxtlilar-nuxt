<template>
  <form @submit.prevent="submit">
    <div class="search_main">
      <h1 id="open_filter_wrapper" @click="toggle">{{ $t("filter") }}</h1>
      <loader v-if="bigLoading" />
      <div class="wrapper_filter" id="main-card" v-else>
        <div class="row">
          <div class="col-xl-6">
            <!-- <CountrySelect :selectedCountry="form.country" /> -->
            <div class="form-group">
              <label for="country" v-text="$t('country')" />
              <a-select
                id="country"
                :showSearch="false"
                :default-value="form.country && form.country.id"
                @change="selectCountry"
                :placeholder="$t('choose')"
                class="form-control"
              >
                <a-select-option
                  v-for="country in getCountries"
                  :key="country.key"
                  :value="country.id"
                >{{ country.name }}</a-select-option>
              </a-select>
              <span class="text-danger">{{ errorText }}</span>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="row row_20">
              <div class="col-6">
                <div class="form-group">
                  <label for="#">{{ $t("height") }}</label>
                  <div class="row">
                    <div class="col-6">
                      <a-select
                        :placeholder="$t('choose')"
                        :showSearch="false"
                        name="from_height"
                        class="form-control"
                        v-model="form.from_height"
                      >
                        <a-select-option
                          v-for="item in 171"
                          :key="item + 49"
                          :value="item + 49"
                        >{{ item + 49 }}</a-select-option>
                      </a-select>
                    </div>
                    <div class="col-6">
                      <a-select
                        :placeholder="$t('choose')"
                        :showSearch="false"
                        name="up_to_height"
                        class="form-control"
                        v-model="form.up_to_height"
                      >
                        <a-select-option
                          v-for="item in 171"
                          :key="item + 49"
                          :value="item + 49"
                        >{{ item + 49 }}</a-select-option>
                      </a-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="#">{{ $t("age") }}</label>
                  <div class="row">
                    <div class="col-6">
                      <a-select
                        :placeholder="$t('choose')"
                        :showSearch="false"
                        name="from_age"
                        class="form-control"
                        v-model="form.from_age"
                      >
                        <a-select-option
                          v-for="item in 100"
                          :key="item"
                          :value="item"
                        >{{ item }}</a-select-option>
                      </a-select>
                    </div>
                    <div class="col-6">
                      <a-select
                        :placeholder="$t('choose')"
                        :showsearch="false"
                        :name="'up_to_age'"
                        class="form-control"
                        v-model="form.up_to_age"
                      >
                        <a-select-option
                          v-for="item in 100"
                          :key="item"
                          :value="item"
                        >{{ item }}</a-select-option>
                      </a-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_search">
          <button
            class="btn btn-link text-decoration-none"
            @click="toSetting"
            v-text="$t('advanced_search')"
          />
        </div>
        <button type="su + '?tab=2'bmit" class="link_blue">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp; {{ $t("Search") }}
        </button>
      </div>
    </div>
    <div class="radio_button allget">
      <input name="random" type="radio" :value="true" id="as1" v-model="random" />
      <label for="as1">{{ $t("new_first") }}</label>
      <input
        name="random"
        type="radio"
        :value="false"
        id="as2"
        v-model="random"
      />
      <label for="as2">{{ $t("mix") }}</label>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
// import CountrySelect from "~/components/selects/CountrySelect.vue";
import Loader from "../Loader.vue";
import _ from "lodash";

export default {
  components: {
    // CountrySelect,
    Loader
  },
  data() {
    return {
      bigLoading: false,
      loading: false,
      form: {},
      from_height: null,
      up_to_height: null,
      from_age: null,
      up_to_age: null,
      random: null,
      random: null,
      country_id: null,
    };
  },
  computed: {
    ...mapGetters(["getSelectedCountry", "getMainFilterDefaultForm"]),
  },
  async mounted() {
    this.bigLoading = true;
    await this.fetchMainFilterDefaultForm();
    this.form = { ...this.getMainFilterDefaultForm };
    this.random = true;
    // await this.fetchMainFilterResult(this.getMainFilterDefaultForm);

    this.bigLoading = false;
  },
  methods: {
    ...mapActions(["fetchMainFilterResult", "fetchMainFilterDefaultForm"]),
    ...mapMutations(["setMainFilterResult"]),
    async submit(e) {
      this.loading = true;
      this.country_id = this.getSelectedCountry
        ? this.getSelectedCountry
        : null;

      await this.fetchMainFilterResult({
        from_height: this.from_height,
        up_to_height: this.up_to_height,
        from_age: this.from_age,
        up_to_age: this.up_to_age,
        random: this.random,
        random: this.random,
        country_id: this.country_id,
      });
      this.loading = false;
    },
    toggle(event) {
      let cardElement = document.getElementById("main-card");
      event.preventDefault();
      DOMAnimations.slideToggle(cardElement);
    },
    toSetting() {
      this.$store.commit("setActiveFilterSection", true);
      this.$router.push(this.localePath("/settings"));
    },
  },
  unmounted() {
    this.setMainFilterResult([]);
  },
};

let DOMAnimations = {
  /**
   * SlideUp
   *
   * @param {HTMLElement} element
   * @param {Number} duration
   * @returns {Promise<boolean>}
   */
  slideUp: function (element, duration = 500) {
    return new Promise(function (resolve, reject) {
      element.style.height = element.offsetHeight + "px";
      element.style.transitionProperty = `height, margin, padding`;
      element.style.transitionDuration = duration + "ms";
      element.offsetHeight;
      element.style.overflow = "hidden";
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      window.setTimeout(function () {
        element.style.display = "none";
        element.style.removeProperty("height");
        element.style.removeProperty("padding-top");
        element.style.removeProperty("padding-bottom");
        element.style.removeProperty("margin-top");
        element.style.removeProperty("margin-bottom");
        element.style.removeProperty("overflow");
        element.style.removeProperty("transition-duration");
        element.style.removeProperty("transition-property");
        resolve(false);
      }, duration);
    });
  },

  /**
   * SlideDown
   *
   * @param {HTMLElement} element
   * @param {Number} duration
   * @returns {Promise<boolean>}
   */
  slideDown: function (element, duration = 500) {
    return new Promise(function (resolve, reject) {
      element.style.removeProperty("display");
      let display = window.getComputedStyle(element).display;

      if (display === "none") display = "block";

      element.style.display = display;
      let height = element.offsetHeight;
      element.style.overflow = "hidden";
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      element.offsetHeight;
      element.style.transitionProperty = `height, margin, padding`;
      element.style.transitionDuration = duration + "ms";
      element.style.height = height + "px";
      element.style.removeProperty("padding-top");
      element.style.removeProperty("padding-bottom");
      element.style.removeProperty("margin-top");
      element.style.removeProperty("margin-bottom");
      window.setTimeout(function () {
        element.style.removeProperty("height");
        element.style.removeProperty("overflow");
        element.style.removeProperty("transition-duration");
        element.style.removeProperty("transition-property");
      }, duration);
    });
  },

  /**
   * SlideToggle
   *
   * @param {HTMLElement} element
   * @param {Number} duration
   * @returns {Promise<boolean>}
   */
  slideToggle: function (element, duration = 500) {
    if (window.getComputedStyle(element).display === "none") {
      return this.slideDown(element, duration);
    } else {
      return this.slideUp(element, duration);
    }
  },
};
</script>
