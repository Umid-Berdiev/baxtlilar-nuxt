<template>
  <div
    class="chat_msg_item"
    :class="{ user1: message.user.id == $auth.user.id }"
  >
    <p class="text" v-text="message.message" />
    <small v-text="formatDate(message.created_at)" />
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["message"],
  methods: {
    formatDate(date) {
      return moment(date).calendar();
    },
  },
};
</script>

<style></style>
