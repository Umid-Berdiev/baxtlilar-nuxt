<template>
  <div class="account_status" v-if="userStatus != 1">
    <img src="~/assets/images/ne_podt.svg" alt />
    {{ $t("account_not_verified") }}
  </div>
  <!-- <div class="account_status" v-else>
    <img src="~/assets/images/verified.svg" alt="" />
    Подтвержденный аккаунт
  </div>-->
</template>

<script>
export default {
  props: {
    userStatus: {
      type: Number,
      default: 2,
    },
  },
};
</script>
