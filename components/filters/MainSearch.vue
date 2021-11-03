<template>
  <form @submit.prevent="submit">
    <div class="search_main">
      <h1 id="open_filter_wrapper" @click="toggle">{{ $t("filter") }}</h1>
      <loader v-if="bigLoading" />
      <div class="wrapper_filter" id="main-card" v-else>
        <div class="row">
          <div class="col-xl-6">
            <country-select
              :selectedCountry="getMainFilterDefaultForm.country"
            />
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
                        v-model:value="form.from_height"
                      >
                        <a-select-option
                          v-for="item in 171"
                          :key="item + 49"
                          :value="item + 49"
                        >
                          {{ item + 49 }}
                        </a-select-option>
                      </a-select>
                    </div>
                    <div class="col-6">
                      <a-select
                        :placeholder="$t('choose')"
                        :showSearch="false"
                        name="up_to_height"
                        class="form-control"
                        v-model:value="form.up_to_height"
                      >
                        <a-select-option
                          v-for="item in 171"
                          :key="item + 49"
                          :value="item + 49"
                        >
                          {{ item + 49 }}
                        </a-select-option>
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
                        v-model:value="form.from_age"
                      >
                        <a-select-option
                          v-for="item in 100"
                          :key="item"
                          :value="item"
                        >
                          {{ item }}
                        </a-select-option>
                      </a-select>
                    </div>
                    <div class="col-6">
                      <a-select
                        :placeholder="$t('choose')"
                        :showsearch="false"
                        :name="'up_to_age'"
                        class="form-control"
                        v-model:value="form.up_to_age"
                      >
                        <a-select-option
                          v-for="item in 100"
                          :key="item"
                          :value="item"
                        >
                          {{ item }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_search">
          <a href="#" @click="toSetting" v-text="$t('advanced_search')" />
        </div>
        <button type="submit" class="link_blue">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp; {{ $t("Search") }}
        </button>
      </div>
    </div>
    <div class="radio_button allget">
      <input
        name="random"
        type="radio"
        :value="true"
        id="as1"
        v-model="form.random"
      />
      <label for="as1">{{ $t("new_first") }}</label>
      <input
        name="random"
        type="radio"
        :value="false"
        id="as2"
        v-model="form.random"
      />
      <label for="as2">{{ $t("mix") }}</label>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import countrySelect from "@/components/selects/countrySelect.vue";
import Loader from "../Loader.vue";
import _ from "lodash";

export default {
  components: { countrySelect, Loader },
  data() {
    return {
      bigLoading: false,
      loading: false,
      form: {},
    };
  },
  computed: {
    ...mapGetters(["getSelectedCountry", "getMainFilterDefaultForm"]),
  },
  async created() {
    this.bigLoading = true;

    if (_.isEmpty(this.getMainFilterDefaultForm)) {
      this.form = await this.fetchMainFilterDefaultForm();
      this.form.random = true;
      await this.fetchMainFilterResult(this.getMainFilterDefaultForm);
    } else {
      this.form = this.getMainFilterDefaultForm;
      this.form.random = true;
      await this.fetchMainFilterResult(this.getMainFilterDefaultForm);
    }

    this.bigLoading = false;
  },
  methods: {
    ...mapActions(["fetchMainFilterResult", "fetchMainFilterDefaultForm"]),
    ...mapMutations(["setMainFilterResult"]),
    async submit(e) {
      this.loading = true;
      this.form.country_id = this.getSelectedCountry
        ? this.getSelectedCountry
        : null;

      await this.fetchMainFilterResult(this.form);
      this.loading = false;
    },
    toggle(event) {
      let cardElement = document.getElementById("main-card");
      event.preventDefault();
      DOMAnimations.slideToggle(cardElement);
    },
    toSetting() {
      this.$store.state.activeFilterSection = true;
      this.$router.push("/setting");
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
