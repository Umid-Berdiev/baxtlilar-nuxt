<template>
  <div class="only_yea">
    <loader v-if="Object.keys(user).length === 0" />
    <div v-else>
      <div class="dropdown" v-if="user.id == currentUser.id">
        <div class="dropdown_top">
          <svg
            class="setting_icon"
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.5489 16.5229C27.3041 16.24 27.1691 15.8765 27.1691 15.5C27.1691 15.1235 27.3041 14.76 27.5489 14.4771L29.5032 12.2454C29.7185 12.0016 29.8522 11.6948 29.8852 11.369C29.9181 11.0433 29.8485 10.7153 29.6864 10.4322L26.6328 5.06992C26.4723 4.78711 26.228 4.56295 25.9346 4.42937C25.6413 4.29579 25.3139 4.25962 24.9991 4.32602L22.1287 4.91494C21.7635 4.99154 21.3832 4.9298 21.0598 4.74136C20.7363 4.55293 20.492 4.25083 20.3729 3.89208L19.4415 1.05596C19.3391 0.748144 19.1439 0.480783 18.8837 0.291673C18.6234 0.102563 18.3111 0.00126896 17.991 0.00210765H11.8838C11.5509 -0.0155321 11.2214 0.0779332 10.9457 0.268228C10.67 0.458523 10.4632 0.735188 10.357 1.05596L9.502 3.89208C9.38291 4.25083 9.13858 4.55293 8.81511 4.74136C8.49164 4.9298 8.11141 4.99154 7.74618 4.91494L4.79944 4.32602C4.50103 4.28322 4.19681 4.33101 3.92511 4.46339C3.65341 4.59577 3.42639 4.80681 3.27263 5.06992L0.219022 10.4322C0.0528443 10.7122 -0.0218745 11.0383 0.00554772 11.364C0.0329699 11.6896 0.161129 11.9982 0.371702 12.2454L2.31075 14.4771C2.55552 14.76 2.69052 15.1235 2.69052 15.5C2.69052 15.8765 2.55552 16.24 2.31075 16.5229L0.371702 18.7546C0.161129 19.0018 0.0329699 19.3104 0.00554772 19.636C-0.0218745 19.9617 0.0528443 20.2878 0.219022 20.5678L3.27263 25.9301C3.4331 26.2129 3.67742 26.4371 3.97077 26.5706C4.26412 26.7042 4.59153 26.7404 4.90632 26.674L7.77671 26.0851C8.14195 26.0085 8.52218 26.0702 8.84565 26.2586C9.16912 26.4471 9.41345 26.7492 9.53254 27.1079L10.4639 29.944C10.5701 30.2648 10.7769 30.5415 11.0526 30.7318C11.3283 30.9221 11.6578 31.0155 11.9907 30.9979H18.0979C18.418 30.9987 18.7303 30.8974 18.9905 30.7083C19.2508 30.5192 19.446 30.2519 19.5484 29.944L20.4797 27.1079C20.5988 26.7492 20.8432 26.4471 21.1666 26.2586C21.4901 26.0702 21.8703 26.0085 22.2356 26.0851L25.106 26.674C25.4208 26.7404 25.7482 26.7042 26.0415 26.5706C26.3349 26.4371 26.5792 26.2129 26.7396 25.9301L29.7933 20.5678C29.9554 20.2847 30.025 19.9567 29.992 19.631C29.9591 19.3052 29.8254 18.9984 29.61 18.7546L27.5489 16.5229ZM25.2739 18.5996L26.4954 19.9944L24.541 23.4349L22.7394 23.063C21.6398 22.8348 20.4959 23.0244 19.5249 23.5958C18.5539 24.1672 17.8233 25.0805 17.4719 26.1625L16.8917 27.8983H12.9831L12.4335 26.1316C12.0821 25.0496 11.3515 24.1362 10.3805 23.5648C9.40952 22.9934 8.26563 22.8038 7.16599 23.032L5.36436 23.4039L3.37951 19.9789L4.60096 18.5841C5.35208 17.7317 5.76733 16.6281 5.76733 15.4845C5.76733 14.3409 5.35208 13.2373 4.60096 12.3849L3.37951 10.9901L5.33382 7.58058L7.13545 7.95253C8.23509 8.18069 9.37899 7.99109 10.35 7.41971C11.321 6.84833 12.0515 5.93495 12.4029 4.85295L12.9831 3.10169H16.8917L17.4719 4.86845C17.8233 5.95044 18.5539 6.86382 19.5249 7.4352C20.4959 8.00658 21.6398 8.19619 22.7394 7.96802L24.541 7.59607L26.4954 11.0366L25.2739 12.4314C24.5312 13.2819 24.1211 14.379 24.1211 15.5155C24.1211 16.652 24.5312 17.7491 25.2739 18.5996ZM14.9374 9.30084C13.7295 9.30084 12.5488 9.66442 11.5444 10.3456C10.5401 11.0268 9.75733 11.9949 9.29509 13.1277C8.83285 14.2604 8.71191 15.5069 8.94756 16.7094C9.18321 17.9119 9.76486 19.0165 10.619 19.8835C11.4731 20.7504 12.5613 21.3408 13.746 21.58C14.9307 21.8192 16.1586 21.6965 17.2746 21.2273C18.3905 20.7581 19.3443 19.9635 20.0154 18.9441C20.6865 17.9246 21.0447 16.7261 21.0447 15.5C21.0447 13.8559 20.4012 12.2791 19.2559 11.1165C18.1106 9.95397 16.5572 9.30084 14.9374 9.30084ZM14.9374 18.5996C14.3335 18.5996 13.7431 18.4178 13.2409 18.0772C12.7388 17.7366 12.3474 17.2525 12.1163 16.6862C11.8851 16.1198 11.8247 15.4966 11.9425 14.8953C12.0603 14.294 12.3511 13.7418 12.7782 13.3083C13.2053 12.8748 13.7494 12.5796 14.3417 12.46C14.934 12.3404 15.548 12.4018 16.106 12.6364C16.664 12.871 17.1409 13.2682 17.4764 13.778C17.812 14.2877 17.991 14.887 17.991 15.5C17.991 16.3221 17.6693 17.1104 17.0967 17.6917C16.524 18.273 15.7473 18.5996 14.9374 18.5996Z"
              fill="#337BAE"
            />
          </svg>
        </div>
        <div class="dropdown_body">
          <button
            class="btn btn-link text-decoration-none"
            @click="gotoSettings"
          >{{ $t("settings") }}</button>
          <button
            class="btn btn-link text-decoration-none"
            @click="logOut"
          >{{ $t("logout") }}</button>
        </div>
      </div>
      <div class="dropdown" v-else>
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
          <a
            href="javascript:;"
            @click="showComplaintModal"
          >{{ $t("complain") }}</a>
        </div>
      </div>
      <h2>{{ user.username }}</h2>
      <h2>{{ user.age }}</h2>
      <p>{{ user.country_name }}</p>
      <icon-status :userStatus="currentUser.status" />
      <br />
      <h6>{{ user.last_seen }}</h6>
    </div>
    <complaint-modal
      ref="complaintModal"
      :from_id="currentUser.id"
      :user_id="user.id"
    />
  </div>
</template>

<script>
import IconStatus from "../icons/IconStatus.vue";
import Loader from "../Loader.vue";
import ComplaintModal from "../modals/ComplaintModal.vue";
export default {
  data() {
    return {
      // currentUser: {}
    };
  },
  components: { Loader, IconStatus, ComplaintModal },
  props: {
    user: Object,
  },
  computed: {
    currentUser() {
      return this.$auth.user;
    },
  },
  methods: {
    async logOut() {
      await this.$auth.logout();
      this.$router.push("/");
    },
    showComplaintModal() {
      this.$refs.complaintModal.showModal();
    },
    gotoSettings() {
      this.$router.push(this.localePath("/settings"));
    },
  },
};
</script>
