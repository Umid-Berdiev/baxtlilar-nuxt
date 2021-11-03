<template>
  <div class="template_main_right" id="content">
    <h1>Взаимности</h1>
    <div class="tab_description">
      <ul class="nav nav_descr">
        <li>
          <a href="#tab1" class="active" data-bs-toggle="tab">{{
            $t('all_offers')
          }}</a>
        </li>
        <li>
          <a href="#tab2" data-bs-toggle="tab">{{ $t('recived') }}</a>
        </li>
        <li>
          <a href="#tab3" data-bs-toggle="tab">{{ $t('sent') }}</a>
        </li>
      </ul>
      <br />
      <div class="tab-content">
        <div class="tab-pane fade show active" id="tab1">
          <users :users="allOffers" />
        </div>
        <div class="tab-pane fade" id="tab2">
          <users :users="receivedOffers" />
        </div>
        <div class="tab-pane fade" id="tab3">
          <users-list :users="sentOffers" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { computed } from "vue";
// import { useStore } from "vuex";
import UsersList from '@/components/lists/UsersList.vue'

export default {
  components: {
    UsersList,
  },

  // data() {
  //   return {
  //     sentOffers: [],
  //     receivedOffers: [],
  //     allOffers: [],
  //   }
  // },

  computed: {
    sentOffers: () => this.$store.getters.getSentOffers,
    receivedOffers: () => this.$store.getters.getReceivedOffers,
    allOffers: () => this.$store.getters.getAllOffers,
  },
  // setup() {
  //   const store = useStore()

  //   store.dispatch('fetchUserOffers')
  //   const sentOffers = computed(() => store.getters.getSentOffers)
  //   const receivedOffers = computed(() => store.getters.getReceivedOffers)
  //   const allOffers = computed(() => store.getters.getAllOffers)

  //   return {
  //     sentOffers,
  //     receivedOffers,
  //     allOffers,
  //   }
  // },
}
</script>

<style></style>
