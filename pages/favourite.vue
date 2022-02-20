<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("favourites") }}</h1>
    <users-list :users="favourites" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UsersList from "@/components/lists/UsersList.vue";

export default {
  components: { UsersList },
  data() {
    return {
      favourites: []
    }
  },
  async asyncData({ $axios }) {
    // store.dispatch("fetchFavourites");
    const favourites = await $axios.$get("/api/favourites");
    return {
      favourites
    }
  },
  // computed: {
  //   ...mapGetters(["getFavourites"]),
  // },
};
</script>

<style></style>
