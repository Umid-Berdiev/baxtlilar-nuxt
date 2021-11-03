<template>
  <form class="chat_bottom" @submit.prevent="sendMessage">
    <input
      type="text"
      v-model="message"
      :placeholder="!isLoading ? 'Напишите сообщение...' : ''"
      style="border-radius: 0"
    />
    <input
      ref="photo"
      name="photo"
      type="file"
      @change="sendFile"
      id="onload_file"
      accept="image/*"
    />
    <label for="onload_file">
      <icon-paper-clip />
    </label>
    <button type="submit">
      <icon-send-message />
    </button>
  </form>
</template>

<script>
import IconPaperClip from '@/components/icons/IconPaperClip.vue'
import IconSendMessage from '@/components/icons/IconSendMessage.vue'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)

    reader.onerror = (error) => reject(error)
  })
}

export default {
  components: { IconPaperClip, IconSendMessage },
  props: ['room'],
  data() {
    return {
      message: '',
      isLoading: false,
    }
  },
  methods: {
    sendMessage() {
      this.isLoading = true
      let messageText = this.message
      this.message = ''

      if (!messageText || messageText.trim() === '') {
        return
      }

      this.$axios({
        method: 'post',
        url: `chat/rooms/${this.room.id}/message`,
        data: {
          message: messageText.trim(),
        },
        headers: authHeader(),
      })
        .then((res) => {
          if (res.status == 201) {
            this.$emit('messageSent')
            this.isLoading = false
          }
        })
        .catch((err) => {
          console.log('failed: ', err)
        })
    },
    async sendFile(event) {
      this.isLoading = true
      const photo = await getBase64(event.target.files[0])
      console.log('photo: ', photo)

      this.$axios({
        method: 'post',
        url: `chat/rooms/${this.room.id}/upload-photo`,
        data: {
          photo,
        },
        // data: this.gatherFormData(),
        headers: authHeader(),
      })
        .then((res) => {
          if (res.status == 201) {
            this.$emit('fileSent')
            this.isLoading = false
          }
        })
        .catch((err) => {
          console.log('failed: ', err)
        })
    },
    gatherFormData() {
      const vm = this
      const data = new FormData()
      data.append('photo', vm.$refs.photo.files[0])
      console.log('sending File... ', data)

      return data
    },
  },
}
</script>
