<template>
  <nuxt-link :to="'/chat/' + chat_id" class="link_green">
    {{ $t("to_chat") }}
  </nuxt-link>
</template>

<script>
import { mapActions } from "vuex";

export default {
  async created() {
    this.chat_id = await this.fetchChatId({ user_id: this.user_id });
  },
  props: {
    user_id: Number,
  },
  data() {
    return {
      chat_id: null,
    };
  },
  methods: {
    ...mapActions(["fetchChatId"]),
  },
};
</script>
