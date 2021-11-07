<template>
  <div>
    <div
      v-for="(item, index) in chatData"
      :key="index"
      class="chat_msg_item"
      :class="{ user1: item.user.id == $auth.user.id }"
    >
      <p v-if="item.message" class="text" v-text="item.message" />
      <img
        v-else
        :src="APP_URL + item.photo_url"
        width="200"
        style="min-height: 200px"
      />
      <div class="time" v-text="formatDate(item.created_at)" />
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    chatData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      APP_URL: process.env.API_URL,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).calendar();
    },
  },
};
</script>

<style></style>
