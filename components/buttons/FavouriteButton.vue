<template>
  <div>
    <a @click="addFavourite" class="to_favourite active" v-if="favourite"></a>
    <a @click="addFavourite" class="to_favourite" v-else></a>
    <a
      href="javascript:;"
      @click="showModal"
      class="close_user_card"
      v-if="showX"
    >
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.66705 0.423887L10.0002 7.75702L17.3333 0.446109C17.4777 0.299201 17.651 0.18385 17.8422 0.10735C18.0335 0.0308511 18.2385 -0.00513196 18.4444 0.0016766C18.8484 0.0278189 19.229 0.200096 19.5152 0.48634C19.8015 0.772584 19.9738 1.15322 19.9999 1.55719C20.0019 1.75581 19.9636 1.95277 19.8872 2.13612C19.8108 2.31947 19.6979 2.4854 19.5555 2.62383L12.2001 10.0014L19.5555 17.379C19.8444 17.659 20.0044 18.0456 19.9999 18.4456C19.9738 18.8496 19.8015 19.2302 19.5152 19.5165C19.229 19.8027 18.8484 19.975 18.4444 20.0011C18.2385 20.0079 18.0335 19.972 17.8422 19.8955C17.651 19.819 17.4777 19.7036 17.3333 19.5567L10.0002 12.2458L2.68927 19.5567C2.54489 19.7036 2.3716 19.819 2.18035 19.8955C1.9891 19.972 1.78406 20.0079 1.57819 20.0011C1.16669 19.9797 0.777712 19.8066 0.486344 19.5152C0.194975 19.2239 0.0218741 18.8349 0.000454827 18.4234C-0.00155579 18.2248 0.0368006 18.0278 0.113197 17.8445C0.189594 17.6611 0.302439 17.4952 0.444887 17.3568L7.80024 10.0014L0.422666 2.62383C0.284228 2.48353 0.17549 2.31677 0.102948 2.1335C0.0304052 1.95024 -0.00445332 1.75423 0.000454827 1.55719C0.0265971 1.15322 0.198874 0.772584 0.485118 0.48634C0.771362 0.200096 1.152 0.0278189 1.55597 0.0016766C1.76023 -0.00802528 1.96431 0.0244566 2.15547 0.0970973C2.34663 0.169738 2.52077 0.28098 2.66705 0.423887Z"
          fill="#337BAE"
        />
      </svg>
    </a>
    <div
      class="modal fade language_popup_style"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      ref="favouriteModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header"></div>
          <div class="modal-body" style="max-width: 700px">
            <h2>{{ $t("Are you sure block this user") }}</h2>
            <div class="button-group">
              <button @click="blockUser" class="link_blue">{{ $t("yes") }}</button>
              <button @click="closeModal" class="link_blue red">{{ $t("no") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    showX: {
      type: Boolean,
      default: true,
    },
    userId: Number,
    isFavourite: Boolean,
  },
  data() {
    return {
      favourite: this.isFavourite,
    };
  },

  methods: {
    ...mapActions(["fetchAddFavourite", "fetchAddBlock"]),
    async addFavourite() {
      const response = await this.$axios.post("api/add-favourite", {
        user_id: this.userId,
      });
      this.favourite = !this.favourite;
      // this.fetchAddFavourite(this.userId);
    },
    blockUser() {
      this.$refs.favouriteModal.hide();
      this.fetchAddBlock(this.userId);
      this.$emit("hideUser", true);
    },
    showModal() {
      this.$refs.favouriteModal.show();
    },
    closeModal() {
      this.$refs.favouriteModal.hide();
    },
  },
};
</script>
