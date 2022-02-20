<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("Взаимности") }}</h1>
    <div class="tab_description">
      <b-tabs pills fill content-class="mt-5" id="recipt-tab">
        <b-tab
          title-item-class="px-4"
          title-link-class="rounded-pill py-3 h5"
          :title="$t('all_offers')"
          active
        >
          <!-- <b-text></b-text> -->
          <UsersList :users="allOffers" />
        </b-tab>
        <b-tab
          title-item-class="px-4"
          title-link-class="rounded-pill py-3 h5"
          :title="$t('recived')"
        >
          <!-- <b-text></b-text> -->
          <UsersList :users="receivedOffers" />
        </b-tab>
        <b-tab
          title-item-class="px-4"
          title-link-class="rounded-pill py-3 h5"
          :title="$t('sent')"
        >
          <!-- <b-text></b-text> -->
          <UsersList :users="sentOffers" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import UsersList from "@/components/lists/UsersList.vue";

export default {
  components: {
    UsersList,
  },
  async asyncData({ store }) {
    await store.dispatch('userModule/fetchUserOffers');
  },
  computed: {
    sentOffers() {
      return this.$store.getters["userModule/getSentOffers"];
    },
    receivedOffers() {
      return this.$store.getters["userModule/getReceivedOffers"];
    },
    allOffers() {
      return this.$store.getters["userModule/getAllOffers"];
    },
  },
};
</script>

<style>
.rounded-pill {
  border: 3px solid #337bae;
  font-weight: 500;
  color: #337bae;
}
.rounded-pill.active {
  background: #337bae !important;
}
</style>
