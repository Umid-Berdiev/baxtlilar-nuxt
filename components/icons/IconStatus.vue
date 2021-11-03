<template>
  <div class="account_status" v-if="status != 1">
    <img src="/src/assets/images/ne_podt.svg" alt="" />
    {{ $t("account_not_verified") }}
  </div>
  <!-- <div class="account_status" v-else>
    <img src="/src/assets/images/verified.svg" alt="" />
    Подтвержденный аккаунт
  </div> -->
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 2,
    },
  },
};
</script>
