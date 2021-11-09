<template>
  <div class="template_main_right personal" id="content">
    <div class="block_top_about">
      <user-images-slider :user_id="currentUser.id" />
      <user-main :user="currentUser" />
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
            <user-data :user="currentUser" />
          </div>
          <div id="tab2" class="tab-content">
            <user-relatives :relatives="relatives" />
          </div>
          <div id="tab3" class="tab-content">
            <user-answers :answers="answers" />
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
  async asyncData({ $axios, store }) {
    const res = await $axios.$get("api/user-details");
    const relatives = await store.dispatch("fetchRelatives", res.id);
    const answers = await store.dispatch("fetchAnswers", res.id);

    return {
      currentUser: res,
      relatives,
      answers,
    };
  },
};
</script>
