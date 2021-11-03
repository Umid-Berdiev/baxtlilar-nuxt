<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("favourites") }}</h1>
    <users-list :users="getFavourites" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UsersList from "@/components/lists/UsersList.vue";

export default {
  components: { UsersList },
  created() {
    this.fetchFavourites();
  },
  methods: {
    ...mapActions(["fetchFavourites"]),
  },
  computed: {
    ...mapGetters(["getFavourites"]),
  },
};
</script>

<style></style>
