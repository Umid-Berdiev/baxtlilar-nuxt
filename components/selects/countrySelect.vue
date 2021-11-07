<template>
  <div class="form-group">
    <label for="country" v-text="$t('country')" />
    <a-select
      id="country"
      :showSearch="false"
      :default-value="selectedCountry && selectedCountry.id"
      @change="selectCountry"
      :placeholder="$t('choose')"
      class="form-control"
    >
      <a-select-option
        v-for="country in getCountries"
        :key="country.key"
        :value="country.id"
      >
        {{ country.name }}
      </a-select-option>
    </a-select>
    <span class="text-danger">{{ errorText }}</span>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    selectedCountry: { type: Object, default: () => {} },
    errorText: String,
  },
  data() {
    return { country: {} };
  },
  computed: {
    ...mapGetters(["getCountries"]),
  },
  methods: {
    ...mapActions(["fetchRegions", "fetchLanguages", "fetchCountries"]),
    ...mapMutations(["setSelectedCountry"]),
    selectCountry(e) {
      this.setSelectedCountry(e);
    },
  },
  async created() {
    await this.fetchCountries();
    if (this.selectedCountry) this.country = this.selectedCountry;
    else this.country = this.getCountries[0];
  },
};
</script>
