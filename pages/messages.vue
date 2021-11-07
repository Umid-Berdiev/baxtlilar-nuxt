<template>
  <div class="template_main_right" id="content" ref="message">
    <h1>{{ $t("chats") }}</h1>
    <card-chat-room
      :chatRoom="chatRoomWithAdmin"
      :otherUser="
        chatRoomWithAdmin.users &&
        chatRoomWithAdmin.users.find((user) => user.id != $auth.user.id)
      "
      :unreadNotificationsCount="
        getUnreadNotificationsForChatroom(chatRoomWithAdmin.id)
      "
    />
    <card-chat-room
      v-for="(room, index) in chatRooms"
      :key="index"
      :chatRoom="room"
      :otherUser="room.users.find((user) => user.id != $auth.user.id)"
      :unreadNotificationsCount="getUnreadNotificationsForChatroom(room.id)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardChatRoom from "@/components/cards/CardChatRoom.vue";

export default {
  components: { CardChatRoom },
  data() {
    return {
      chatRoomWithAdmin: {},
      chatRooms: [],
    };
  },
  computed: {
    ...mapGetters(["getRelatedUsers"]),
  },
  async created() {
    await this.fetchChatRooms();
  },
  methods: {
    async fetchChatRooms() {
      await this.$axios
        .get("api/chat/rooms")
        .then((res) => {
          this.chatRoomWithAdmin = res.data.chat_room_with_admin ?? {};
          this.chatRooms = res.data.other_chat_rooms ?? [];
        })
        .catch((err) => console.log(err));
    },
    getUnreadNotificationsForChatroom(chatRoomId) {
      let arr = [];
      this.$store.state.user.newMessageNotifications.forEach((notification) => {
        console.log("notification: ", notification);
        if (notification.data && notification.data.chat_room_id == chatRoomId)
          arr.push(notification);
      });

      return arr.length;
    },
  },
};
</script>

<style></style>
