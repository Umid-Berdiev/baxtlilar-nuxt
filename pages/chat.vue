<template>
  <div class="template_main_right" id="content">
    <div class="chat_main">
      <div class="chat_top">
        <nuxt-link to="/messages" class="back">
          <icon-arrow-left />
        </nuxt-link>
        <div class="user_chat">
          <img :src="user.profile_photo_url" alt="" />
          <h2 v-text="user.username"></h2>
        </div>
        <a href="#" class="link_blue red">{{ $t('choosing_user') }}</a>
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
            <a href="#" data-fancybox data-src="#deleteMsg">{{
              $t('delete')
            }}</a>
            <a href="#">{{ $t('settings') }}</a>
            <a href="#">{{ $t('logout') }}</a>
          </div>
        </div>
      </div>
      <div class="chat_body">
        <message
          v-for="message in user.messages"
          :key="message.id"
          :message="message"
        />
      </div>
      <chat-form />
    </div>
  </div>
</template>

<script>
import ChatForm from '@/components/chat/ChatForm.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import MessageItem from '@/components/chat/MessageItem.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { IconArrowLeft, ChatForm, MessageItem },
  data() {
    return {
      messages: [],
      user: {},
    }
  },
  async created() {
    await this.fetchRelatedUsers()
    this.user = await this.getRelatedUsers.find(
      (user) => user.id == this.$route.params.id
    )
  },
  async mounted() {
    this.$emit('added_message', (message) => {
      this.user.messages.unshift(message)
      if (message.selfMessage) {
        this.$refs.message.scrollTop = 0
      }
    })

    Echo.join('chat')
      .here((users) => {
        this.$emit('users.here', users)
      })
      .joining((user) => {
        this.$emit('users.joined', user)
      })
      .leaving((user) => {
        this.$emit('users.left', user)
      })
      .listen('MessageSent', (data) => {
        this.$emit('added_message', data.message)
      })
  },
  computed: {
    ...mapGetters(['getRelatedUsers']),
  },
  methods: {
    ...mapActions(['fetchRelatedUsers']),
  },
}
</script>

<style></style>
