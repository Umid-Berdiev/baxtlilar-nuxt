<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("settings") }}</h1>
    <div class="tab_description sett">
      <ul class="nav nav-tabs">
        <li>
          <a href="#tab1" class="active" data-bs-toggle="tab">{{
            $t("questionnaire")
          }}</a>
        </li>
        <li>
          <a href="#tab2" data-bs-toggle="tab">{{ $t("family") }}</a>
        </li>
        <li>
          <a href="#tab3" data-bs-toggle="tab" id="filter-section">{{
            $t("preferences")
          }}</a>
        </li>
        <li>
          <a href="#tab4" data-bs-toggle="tab">{{ $t("confirmation") }}</a>
        </li>
        <li>
          <a href="#tab5" data-bs-toggle="tab">{{ $t("safety") }}</a>
        </li>
      </ul>
      <div class="tab-content setting_main">
        <div class="tab-pane fade show active" id="tab1">
          <h2>{{ $t("modify_questionnaire") }}</h2>
          <self-form :user="currentUser" />
          <education-form :user="currentUser" />
        </div>
        <div class="tab-pane fade" id="tab2">
          <family-form />
        </div>
        <div class="tab-pane fade" id="tab3">
          <filter-form />
        </div>
        <div class="tab-pane fade" id="tab4">
          <passport-form :user="currentUser" />
        </div>
        <div class="tab-pane fade" id="tab5">
          <security-form :user="currentUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EducationForm from "@/components/forms/EducationForm.vue";
import FamilyForm from "@/components/forms/FamilyForm.vue";
import FilterForm from "@/components/forms/FilterForm.vue";
import PassportForm from "@/components/forms/PassportForm.vue";
import SecurityForm from "@/components/forms/SecurityForm.vue";
import SelfForm from "@/components/forms/SelfForm.vue";

export default {
  components: {
    SelfForm,
    EducationForm,
    FamilyForm,
    FilterForm,
    PassportForm,
    SecurityForm,
  },
  data() {
    return {
      currentUser: {},
    };
  },
  async asyncData({ $axios }) {
    const currentUser = await $axios.$get("api/user-details");

    return {
      currentUser,
    };
  },
  mounted() {
    if (this.$store.state.activeFilterSection) {
      document.getElementById("filter-section").click();
    }
    this.$store.commit("setActiveFilterSection", false);
  },
};
</script>
