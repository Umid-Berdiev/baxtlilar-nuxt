<template>
  <div class="template_main_right" id="content">
    <div class="chat_main">
      <div class="chat_top">
        <nuxt-link to="/messages" class="back">
          <icon-arrow-left />
        </nuxt-link>
        <div class="user_chat">
          <img :src="otherUser.profile_photo_url" />
          <h2 v-text="otherUser.username"></h2>
        </div>
        <a href="javascript:;" class="link_blue red">{{ $t('choosing_user') }}</a>
        <div class="dropdown">
          <div class="dropdown_top">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 210 210"
              style="enable-background: new 0 0 210 210"
              xml:space="preserve"
            >
              <g id="XMLID_27_">
                <path
                  id="XMLID_28_"
                  d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"
                />
                <path
                  id="XMLID_30_"
                  d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"
                />
                <path
                  id="XMLID_71_"
                  d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"
                />
              </g>
            </svg>
          </div>
          <div class="dropdown_body">
            <a href="javascript:;" data-fancybox data-src="#deleteMsg">
              {{
              $t('delete')
              }}
            </a>
            <a href="javascript:;">{{ $t('settings') }}</a>
            <a href="javascript:;">{{ $t('logout') }}</a>
          </div>
        </div>
      </div>
      <div class="chat_body" ref="chat_body">
        <!-- <Suspense> -->
        <template v-if="chatData">
          <chat-window :chatData="chatData" />
        </template>
        <template v-else>
          <loader />
        </template>
        <!-- </Suspense> -->
      </div>
      <chat-form
        :room="currentRoom"
        @messageSent="getChatData"
        @fileSent="getChatData"
      />
    </div>
  </div>
</template>

<script>
import ChatForm from "@/components/chat/ChatForm.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import { mapActions } from "vuex";
// import { defineAsyncComponent } from 'vue'
import Loader from "@/components/Loader.vue";
import ChatWindow from "@/components/chat/ChatWindow.vue";

// const ChatWindow = defineAsyncComponent(() =>
//   import('@/components/chat/ChatWindow.vue')
// )

export default {
  components: {
    ChatForm,
    IconArrowLeft,
    ChatWindow,
    Loader,
  },
  data() {
    return {
      currentRoom: {},
      otherUser: {},
      chatData: [],
      loading: false,
    };
  },
  watch: {
    currentRoom(val, oldVal) {
      if (oldVal.id) {
        this.disconnect(oldVal.id);
      }
      this.connect();
    },
    chatData(value) {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  async created() {
    await this.fetchChatRoom();
    await this.allMarkAsRead();
  },
  updated() {
    // This will be called when the component updates
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  methods: {
    ...mapActions({ fetchUnreadNotifications: "userModule/fetchUnreadNotifications" }),
    connect() {
      if (this.currentRoom.id) {
        let vm = this;
        this.getChatData();

        this.$echo
          .private(`chat.${this.currentRoom.id}`)
          .listen(".message.created", (e) => {
            vm.getChatData();
            vm.allMarkAsRead();
          })
          .listen("NewChatPhoto", (e) => {
            vm.getChatData();
            vm.allMarkAsRead();
          });
      }
    },
    disconnect(roomId) {
      this.$echo.leave(`chat${roomId}`);
    },
    async fetchChatRoom() {
      const res = await this.$axios.get("api/chat/rooms/" + this.$route.params.id);

      this.currentRoom = await res.data.chat_room;
      this.otherUser = this.currentRoom?.users?.find(
        (user) => user.id != this.$auth.user.id
      );
    },
    getChatData() {
      this.$axios
        .get(`api/chat/rooms/${this.currentRoom.id}/data`)
        .then((res) => {
          this.chatData = res.data;
        })
        .catch((err) => console.log(err));
    },
    async allMarkAsRead() {
      await this.$axios({
        url: "api/all-mark-as-read",
        method: "PUT",
        data: { chat_room_id: this.currentRoom.id },
      }).then((res) => {
        this.fetchUnreadNotifications();
      });
    },
    formatDate(date) {
      return moment(date).calendar();
    },
    scrollToBottom() {
      const chatBody = this.$refs.chat_body;

      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    },
  },
};
</script>
