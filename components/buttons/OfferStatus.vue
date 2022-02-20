<template>
  <div>
    <template v-if="offerStatus == null">
      <div class="button-group">
        <button @click="showModal" :class="btnClass" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp; {{ $t("send offer") }}
        </button>
      </div>
    </template>
    <template v-else-if="offerStatus == 'proccess'">
      <div class="button-group">
        <button class="link_disabled" disabled>{{ $t("offer sent") }}</button>
      </div>
    </template>
    <template v-else-if="offerStatus == 'cancelled_by_him_or_her'">
      <!-- <h2>{{ $t("Offer cancelled by him/her") }}</h2> -->
      <div class="button-group">
        <button class="link_disabled" disabled>{{ $t("closed") }}</button>
      </div>
    </template>
    <template v-else-if="offerStatus == 'accepted'">
      <div class="button-group">
        <ToChatButton :user-id="userId" />
      </div>
    </template>
    <template v-else-if="offerStatus == 'accept_or_cancel'">
      <div class="button-group">
        <AcceptButton :user-id="userId" />
        <CancelButton :user-id="userId" />
      </div>
    </template>
    <template v-else>
      <!-- <h2>{{ $t("Offer cancelled by you") }}</h2> -->
      <button class="link_disabled" disabled>{{ $t("offer closed") }}</button>
    </template>
  </div>
</template>

<script>
import AcceptButton from "./AcceptButton.vue";
import CancelButton from "./CancelButton.vue";
import ToChatButton from "./ToChatButton.vue";

export default {
  components: { AcceptButton, CancelButton, ToChatButton },
  props: {
    userId: Number,
    offerStatus: String,
    btnClass: String
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    showModal() {
      console.log('modal btn clicked');
      this.$bvModal.show('offer-modal');
    }
  }
};
</script>
