<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("Взаимности") }}</h1>
    <div class="tab_description">
      <ul class="nav nav_descr">
        <li>
          <a href="#tab1" class="active" data-toggle="tab">{{
            $t("all_offers")
          }}</a>
        </li>
        <li>
          <a href="#tab2" data-toggle="tab">{{ $t("recived") }}</a>
        </li>
        <li>
          <a href="#tab3" data-toggle="tab">{{ $t("sent") }}</a>
        </li>
      </ul>
      <br />
      <div class="tab-content">
        <div class="tab-pane fade show active" id="tab1">
          <UsersList :users="allOffers" />
        </div>
        <div class="tab-pane fade" id="tab2">
          <UsersList :users="receivedOffers" />
        </div>
        <div class="tab-pane fade" id="tab3">
          <UsersList :users="sentOffers" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersList from "@/components/lists/UsersList.vue";

export default {
  components: {
    UsersList,
  },
  computed: {
    sentOffers() {
      return this.$store.getters["user/getSentOffers"];
    },
    receivedOffers() {
      return this.$store.getters["user/getReceivedOffers"];
    },
    allOffers() {
      return this.$store.getters["user/getAllOffers"];
    },
  },
};
</script>
