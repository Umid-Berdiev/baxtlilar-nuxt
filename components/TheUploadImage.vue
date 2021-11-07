<template>
  <div class="clearfix">
    <a-upload
      accept="image/*"
      list-type="picture-card"
      :file-list="localFileList"
      :before-upload="beforeUpload"
      :remove="handleRemove"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="localFileList.length < 5">
        <icon-plus />
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import IconPlus from "./icons/IconPlus.vue";
import _ from "lodash";

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
    fileList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      localFileList: [],
    };
  },
  mounted() {
    this.localFileList = [...this.fileList];
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.localFileList = fileList;
      this.$emit("update-list", this.localFileList);
    },
    handleRemove(file) {
      const id = file.id;
      const url = file.url;
      this.$store.dispatch("fetchDeleteImage", { id, url });
      const index = this.localFileList.indexOf(file);
      const newFileList = this.localFileList.slice();
      newFileList.splice(index, 1);
      this.localFileList = newFileList;
    },
    beforeUpload(file) {
      if (file["size"] < 2111775) {
        this.localFileList = [...this.localFileList, file];
      } else {
        alert("File size can not be bigger than 2 MB");
      }
      return false;
    },
  },
};
</script>
