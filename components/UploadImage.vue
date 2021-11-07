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
        <icon-plus />
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    <span class="text-danger">{{ errorText }}</span>
  </div>
</template>

<script>
import IconPlus from "./icons/IconPlus.vue";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  components: { IconPlus },
  props: {
    errorText: {
      type: String,
      default: "",
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
      previewImage: "",
      // fileList: [],
    };
  },
  mounted() {
    if (this.type != null) {
      this.getOldImages();
    }
  },
  computed: {
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    async getOldImages() {
      const response = await this.$axios.$post("api/user-images", {
        user_id: this.user ? this.user.id : null,
        type: this.type,
      });
      this.fileList.value = await response.data;
    },

    handleRemove(file) {
      const id = file.id;
      const url = file.url;
      store.dispatch("fetchDeleteImage", { id, url });
      const index = this.fileList.value.indexOf(file);
      const newFileList = this.fileList.value.slice();
      newFileList.splice(index, 1);
      this.fileList.value = newFileList;
    },

    beforeUpload(file) {
      if (file["size"] < 2111775) {
        this.fileList.value = [...this.fileList.value, file];
      } else {
        alert("File size can not be bigger than 2 MB");
      }
      return false;
    },

    handleCancel() {
      previewVisible.value = false;
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    },

    async handleChange({ file, fileList: newFileList }) {
      this.fileList.value = newFileList;
    },
  },
};
</script>
