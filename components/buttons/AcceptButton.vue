<template>
  <button @click="offer" class="link_blue">
    <span v-show="loading" class="spinner-border spinner-border-sm text-white"></span>
    &nbsp; {{ $t("accept") }}
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    userId: Number,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["fetchOffer"]),
    async offer() {
      this.loading = true;
      const to_id = this.userId * 1;
      const status = "accepted";
      await this.fetchOffer({ to_id, status });
      this.$store.state.currentUser.offer_status = status;
      this.loading = false;
    },
  },
};
</script>
