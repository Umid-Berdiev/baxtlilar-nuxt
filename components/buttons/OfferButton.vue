<template>
  <div>
    <button @click="showModal" :class="buttonClass" :disabled="loading">
      <span
        v-show="loading"
        class="spinner-border spinner-border-sm text-white"
      ></span>
      &nbsp; {{ $t("send offer") }}
    </button>

    <div
      class="modal fade language_popup_style"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      ref="offerModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header"></div>
          <div class="modal-body" style="max-width: 700px">
            <h2>{{ $t("are_you_sure_send_offer") }}</h2>
            <div class="button-group">
              <button @click="offer" class="link_blue">{{ $t("yes") }}</button>
              <button @click="closeModal" class="link_blue red">
                {{ $t("no") }}
              </button>
            </div>
            <h4>
              {{ $t("other_offers") + ": " + $auth.user.reciprocity_count }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    user_id: Number,
  },
  data() {
    return {
      loading: false,
      buttonClass: "link_blue",
    };
  },
  methods: {
    ...mapActions(["fetchOffer"]),
    showModal() {
      this.$refs.offerModal.show();
    },
    closeModal() {
      this.$refs.offerModal.hide();
    },
    async offer() {
      this.$refs.offerModal.hide();
      this.loading = true;
      this.buttonClass = "link_disabled";
      const to_id = this.user_id * 1;
      const status = "proccess";
      await this.fetchOffer({ to_id, status });
      this.$store.state.currentUser.offer_status = status;
      this.loading = false;
      this.buttonClass = "link_blue";
    },
  },
};
</script>
