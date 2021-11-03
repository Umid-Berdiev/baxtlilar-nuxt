<template>
  <div>
    <template v-if="offer_status == null">
      <div class="button-group">
        <offer-button :user_id="user_id" />
      </div>
    </template>
    <template v-else-if="offer_status == 'proccess'">
      <div class="button-group">
        <button class="link_disabled" disabled>
          {{ $t('offer sent') }}
        </button>
      </div>
    </template>
    <template v-else-if="offer_status == 'cancelled_by_him_or_her'">
      <!-- <h2>{{ $t("Offer cancelled by him/her") }}</h2> -->
      <div class="button-group">
        <button class="link_disabled" disabled>{{ $t('closed') }}</button>
      </div>
    </template>
    <template v-else-if="offer_status == 'accepted'">
      <div class="button-group">
        <to-chat-button :user_id="user_id" />
      </div>
    </template>
    <template v-else-if="offer_status == 'accept_or_cancel'">
      <div class="button-group">
        <accept-button :user_id="user_id" />
        <cancel-button :user_id="user_id" />
      </div>
    </template>
    <template v-else>
      <!-- <h2>{{ $t("Offer cancelled by you") }}</h2> -->
      <button class="link_disabled" disabled>{{ $t('offer closed') }}</button>
    </template>
  </div>
</template>

<script>
import AcceptButton from './AcceptButton.vue'
import CancelButton from './CancelButton.vue'
import OfferButton from './OfferButton.vue'
import ToChatButton from './ToChatButton.vue'
export default {
  components: { OfferButton, AcceptButton, CancelButton, ToChatButton },
  props: {
    user_id: Number,
    offer_status: String,
  },
}
</script>
