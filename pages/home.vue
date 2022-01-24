<template>
  <div class="template_main_right" id="content">
    <main-search />
    <empty-card v-if="showEmpty" :textIndex="emptyIndex" />
    <users-list v-else :users="getMainFilterResult" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MainSearch from "@/components/filters/MainSearch.vue";
import UsersList from "@/components/lists/UsersList.vue";
import EmptyCard from "@/components/cards/EmptyCard.vue";

export default {
  components: { MainSearch, UsersList, EmptyCard },
  data() {
    return {
      emptyIndex: 0,
    };
  },
  async asyncData({ $auth, $router, app }) {
    if ($auth.user.step !== 0) {
      $router.push(app.i18n.localePath("/questionnaire"));
    }
  },
  computed: {
    currentUser() {
      return this.$auth.user;
    },
    ...mapGetters(["getMainFilterResult"]),
    showEmpty() {
      if (this.currentUser && this.currentUser.status != 1) {
        this.emptyIndex = 0;
        return true;
      }
      if (this.currentUser && this.currentUser.tariff_id == null) {
        this.emptyIndex = 1;
        return true;
      }
      return false;
    },
  },
};
</script>
