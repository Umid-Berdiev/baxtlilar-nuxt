<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("settings") }}</h1>
    <div class="sett">
      <b-tabs v-model="tabIndex">
        <!-- <b-tab :title="$t('questionnaire')">
          <h2>{{ $t("modify_questionnaire") }}</h2>
          <self-form :user="currentUser" />
          <education-form :user="currentUser" />
        </b-tab>
        <b-tab :title="$t('family')">
          <family-form />
        </b-tab>-->
        <b-tab :title="$t('preferences')">
          <filter-form />
        </b-tab>
        <!-- <b-tab :title="$t('confirmation')">
          <passport-form :user="currentUser" />
        </b-tab>-->
        <b-tab :title="$t('safety')">
          <security-form :user="currentUser" />
        </b-tab>
      </b-tabs>
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
      tabIndex: null,
    };
  },
  async created() {
    if (this.$store.state.countries.length === 0) {
      this.$store.dispatch('fetchCountries')
    }

    if (this.$store.state.religions.length === 0) {
      this.$store.dispatch('fetchReligions')
    }

    try {
      const currentUser = await this.$axios.$get(`api/user-details/${this.$auth.user.id}`);
      const tabIndex = Number(this.$route.query.tab) || 0;

        this.currentUser = currentUser
        this.tabIndex = tabIndex

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
      this.$toast.error(
        this.$i18n.t("error_while_fetching_data") + ": " + message
      );
    }
  },
  // async asyncData({ $axios, route, $auth, app, store }) {
  //   if (store.state.countries.length === 0) {
  //     const response = await $axios.$post("/api/countries", {
  //       lang: app.i18n.locale,
  //     });

  //     store.commit("setСountries", response);
  //   }

  //   try {
  //     const currentUser = await $axios.$get(`api/user-details/${$auth.user.id}`);
  //     const tabIndex = Number(route.query.tab) || 0;

  //     return {
  //       currentUser,
  //       tabIndex,
  //     };

  //   } catch (error) {
  //     const message =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString();

  //     console.log(
  //       app.i18n.t("error_while_fetching_data") + ": " + message
  //     );
  //     app.$toast.error(
  //       app.i18n.t("error_while_fetching_data") + ": " + message
  //     );
  //   }
  // },
};
</script>
