<template>
  <div>
    <b-modal ref="complaintModal">
      <div id="enter_site_popup" class="popup_register_style">
        <h2 v-text="$t('complain')" class="text-capitalize"></h2>
        <form @submit.prevent="submit">
          <div class="form-group">
            <textarea
              ref="description"
              rows="5"
              name="description"
              class="form-control"
              v-model="description"
            />
          </div>
          <div class="form-group text-center">
            <button class="link_blue" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              &nbsp;
              <span
                v-text="$t('complain')"
                class="text-capitalize text-white"
              ></span>
            </button>
          </div>
        </form>
      </div>
    </b-modal>
    <success-modal
      :success="true"
      :text="$t('Complaint is Sent')"
      ref="successModal"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SuccessModal from "./SuccessModal.vue";

export default {
  components: { SuccessModal },
  props: {
    from_id: Number,
    user_id: Number,
  },
  data() {
    return {
      loading: false,
      description: "",
      complaintModal: {},
    };
  },
  methods: {
    ...mapActions(["fetchComplaint"]),
    async submit() {
      this.loading = true;
      await this.fetchComplaint({
        description: this.description,
        user_id: this.user_id,
        from_id: this.from_id,
      });
      this.loading = false;
      this.$refs.complaintModal.hide();
      this.$refs.successModal.showModal();
    },
    showModal() {
      this.description = "";
      this.$refs.complaintModal.show();
    },
  },
};
</script>
