<template>
  <div
    class="modal fade language_popup_style"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="successModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header"></div>
        <div>
          <div class="modal-body" v-if="!loading">
            <img
              width="150"
              v-if="success"
              src="../../assets/images/success.png"
              alt="Success"
            />
            <img
              width="150"
              v-else
              src="../../assets/images/fail.png"
              alt="Success"
            />
            <h2 v-text="text" class="mb-2" />
          </div>
          <button :disabled="loading" @click="hideModal" class="link_blue red">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            &nbsp;{{ $t("Close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  props: {
    text: String,
    success: Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modal: {},
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.successModal);
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
};
</script>
