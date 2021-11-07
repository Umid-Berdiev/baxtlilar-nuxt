<template>
  <div class="chat_msg_item" :class="{ user1: photo.user.id == $auth.user.id }">
    <img :src="APP_URL + '/' + photo.photo_url" width="200" />
    <div class="time" v-text="formatDate(photo.created_at)" />
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["photo"],
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
