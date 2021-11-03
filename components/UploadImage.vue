<template>
  <div class="clearfix">
    <a-upload
      accept="image/*"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :remove="handleRemove"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 5">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="11" width="3" height="25" rx="1.5" fill="#000" />
          <rect
            y="14"
            width="3"
            height="25"
            rx="1.5"
            transform="rotate(-90 0 14)"
            fill="#000"
          />
        </svg>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    <span class="text-danger">{{ errorText }}</span>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)

    reader.onerror = (error) => reject(error)
  })
}

export default {
  props: {
    errorText: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: null,
    },
    fileList: [],
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      // fileList: [],
    }
  },
  mounted() {
    if (this.type != null) {
      this.getOldImages()
    }
  },
  computed: {
    user: () => this.$auth.user,
  },
  methods: {
    async getOldImages() {
      const response = await axios.post(
        'user-images',
        {
          user_id: user ? user.id : null,
          type: props.type,
        },
        {
          headers: authHeader(),
        }
      )
      fileList.value = await response.data
    },

    handleRemove(file) {
      const id = file.id
      const url = file.url
      store.dispatch('fetchDeleteImage', { id, url })
      const index = fileList.value.indexOf(file)
      const newFileList = fileList.value.slice()
      newFileList.splice(index, 1)
      fileList.value = newFileList
    },

    beforeUpload(file) {
      if (file['size'] < 2111775) {
        fileList.value = [...fileList.value, file]
      } else {
        alert('File size can not be bigger than 2 MB')
      }
      return false
    },

    handleCancel() {
      previewVisible.value = false
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }

      previewImage.value = file.url || file.preview
      previewVisible.value = true
    },

    async handleChange({ file, fileList: newFileList }) {
      fileList.value = newFileList
    },
  },
}
</script>
