<template>
  <div class="template_main_right" id="content" ref="message">
    <h1>{{ $t("chats") }}</h1>
    <card-chat-room
      :chatRoom="chatRoomWithAdmin"
      :otherUser="getOtherUser(chatRoomWithAdmin.users)"
      :unreadNotificationsCount="
        getUnreadNotificationsForChatroom(chatRoomWithAdmin.id)
      "
    />
    <card-chat-room
      v-for="(room, index) in chatRooms"
      :key="index"
      :chatRoom="room"
      :otherUser="getOtherUser(room.users)"
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
  // async created() {
  //   await this.fetchChatRooms();
  // },
  async asyncData({ $axios }) {
    const res = await $axios.$get('api/chat/rooms');
    const chatRoomWithAdmin = res.chat_room_with_admin ?? {};
    const chatRooms = res.other_chat_rooms ?? [];

    return {
      chatRoomWithAdmin,
      chatRooms,
    }
  },
  methods: {
    // async fetchChatRooms() {
    //   await this.$axios
    //     .get("api/chat/rooms")
    //     .then((res) => {
    //       this.chatRoomWithAdmin = res.data.chat_room_with_admin ?? {};
    //       this.chatRooms = res.data.other_chat_rooms ?? [];
    //     })
    //     .catch((err) => console.log(err));
    // },
    getUnreadNotificationsForChatroom(chatRoomId) {
      let arr = [];
      this.$store.state.userModule.newMessageNotifications.forEach((notification) => {
        // console.log("notification: ", notification);
        if (notification.data && notification.data.chat_room_id == chatRoomId)
          arr.push(notification);
      });

      return arr.length;
    },
    getOtherUser(users) {
      console.log('auth id: ', this.$auth.user.id);
      if (users && users.length > 0) {
        const otherUser = users.find((user) => user.id != this.$auth.user.id)
        if (otherUser) {
          return otherUser
        }
      }
      return {}
    }
  },
};
</script>

<style></style>
