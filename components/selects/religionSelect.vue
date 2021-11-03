<template>
  <div class="form-group">
    <label for="">{{ $t("religion") }}</label>
    <select
      class="simply_select"
      name="religion_id"
      @change="$store.commit('setSelectedRegion', selectedRegion)"
    >
      <option
        v-for="religion in getReligions"
        v-text="religion.name"
        :key="religion.id"
        :value="religion.id"
      ></option>
    </select>
    <a-select
      :placeholder="$t('choose')"
      :showSearch="false"
      @change="selectRelegion"
      class="form-control"
    >
      <a-select-option
        v-for="religion in getReligions"
        :key="religion.id"
        :value="religion.id"
      >
        {{ religion.name }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedReligion: {},
    };
  },
  computed: {
    ...mapGetters(["getReligions"]),
  },
  methods: {
    ...mapActions(["fetchReligions"]),
  },
  mounted() {
    this.fetchReligions();
  },
};
</script>

<style></style>
