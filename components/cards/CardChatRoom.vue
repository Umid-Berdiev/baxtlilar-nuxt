<template>
  <nuxt-link :to="localePath(`/chat/${chatRoom.id}`)" class="message_item">
    <div
      class="message_img"
      :class="{ has_message: unreadNotificationsCount }"
      :data-count-message="unreadNotificationsCount"
    >
      <img :src="otherUser && otherUser.profile_photo_url" />
    </div>
    <div class="mess_user">
      <h2 v-text="otherUser && otherUser.username" />
      <p
        v-text="
          chatRoom.messages &&
          chatRoom.messages[chatRoom.messages.length - 1].message
        "
      />
    </div>
    <div class="date_message">
      <span
        v-text="
          formatDate(
            chatRoom.messages &&
              chatRoom.messages[chatRoom.messages.length - 1].created_at
          )
        "
      />
      <span><img src="~/assets/images/readen.svg" /></span>
    </div>
  </nuxt-link>
</template>

<script>
import moment from "moment";

export default {
  props: {
    chatRoom: {
      type: Object,
      default: () => {},
    },
    otherUser: {
      type: Object,
      default: () => {},
    },
    unreadNotificationsCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).calendar();
    },
  },
};
</script>
