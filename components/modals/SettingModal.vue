<template>
  <div
    class="modal fade language_popup_style"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    id="setting-modal"
    ref="settingModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header"></div>
        <div class="modal-body">
          <h2>{{ $t("Your profile is pending") }}</h2>
          <button
            type="button"
            class="link_blue red"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            {{ $t("Close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$refs.settingModal.show();
    },
  },
};
</script>
