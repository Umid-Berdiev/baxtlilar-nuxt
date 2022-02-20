<template>
  <b-modal
    modal-class="language_popup_style"
    id="offer-modal"
    centered
    hide-footer
  >
    <h2>{{ $t("are_you_sure_send_offer") }}</h2>
    <div class="button-group">
      <button @click="offer" class="link_blue">{{ $t("yes") }}</button>
      <button @click="closeModal" class="link_blue red">{{ $t("no") }}</button>
    </div>
    <h4>{{ $t("other_offers") + ": " + $auth.user.reciprocity_count }}</h4>
  </b-modal>
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
      buttonClass: "link_blue",
    };
  },
  methods: {
    ...mapActions(["fetchOffer"]),
    closeModal() {
      this.$bvModal.hide('offer-modal');
    },
    async offer() {
      this.$bvModal.hide('offer-modal');
      this.loading = true;
      this.buttonClass = "link_disabled";
      const to_id = this.userId;
      const status = "proccess";
      await this.fetchOffer({ to_id, status });
      this.$store.state.currentUser.offer_status = status;
      this.loading = false;
      this.buttonClass = "link_blue";
      this.$emit('update:buttonClass', this.buttonClass)
    },
  },
};
</script>
