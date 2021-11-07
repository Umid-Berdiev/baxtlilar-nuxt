<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("favourites") }}</h1>
    <users-list :users="getFavourites" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UsersList from "@/components/lists/UsersList.vue";

export default {
  components: { UsersList },
  async asyncData({ store }) {
    store.dispatch("fetchFavourites");
  },
  computed: {
    ...mapGetters(["getFavourites"]),
  },
};
</script>

<style></style>
