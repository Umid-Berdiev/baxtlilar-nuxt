<template>
  <div class="template_main_right personal" id="content">
    <div class="block_top_about">
      <UserImagesSlider :user_id="currentUser.id" />
      <UserMain :user="currentUser" />
    </div>
    <div class="block_tab">
      <div class="tabs">
        <ul id="tabs-nav">
          <li>
            <a href="#tab1">{{ $t("about_myself") }}</a>
          </li>
          <li>
            <a href="#tab2">{{ $t("family") }}</a>
          </li>
          <li>
            <a href="#tab3">{{ $t("answers_for") }} {{ $t("questions") }}</a>
          </li>
        </ul>
        <!-- END tabs-nav -->
        <div id="tabs-content">
          <div id="tab1" class="tab-content">
            <UserData :user="currentUser" />
          </div>
          <div id="tab2" class="tab-content">
            <UserRelatives :relatives="relatives" />
          </div>
          <div id="tab3" class="tab-content">
            <UserAnswers :answers="answers" />
          </div>
        </div>
        <!-- END tabs-content -->
      </div>
    </div>
  </div>
</template>

<script>
import UserAnswers from "@/components/cards/UserAnswers.vue";
import UserData from "@/components/cards/UserData.vue";
import UserMain from "@/components/cards/UserMain.vue";
import UserRelatives from "@/components/cards/UserRelatives.vue";
import UserImagesSlider from "@/components/sliders/UserImagesSlider.vue";

export default {
  components: {
    UserImagesSlider,
    UserAnswers,
    UserRelatives,
    UserData,
    UserMain,
  },
  data() {
    return {
      currentUser: {},
      relatives: [],
      answers: [],
    };
  },
  async asyncData({ $axios, store, $auth, app }) {
    try {
      const res = await $axios.$get(`api/user-details/${$auth.user.id}`);
      const relatives = store.dispatch("fetchRelatives", res.id);
      const answers = store.dispatch("fetchAnswers", res.id);

      return {
        currentUser: res,
        relatives,
        answers,
      };


    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(
        app.i18n.t("error_while_fetching_data") + ": " + message
      );
      // app.toast.error(
      //   app.i18n.t("error_while_fetching_data") + ": " + message
      // );
    }
  },
};
</script>
