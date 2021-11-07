<template>
  <div class="empty_card">
    <img src="~/assets/images/und.svg" alt="" />
    <h4>
      {{ texts[textIndex] }}
    </h4>
    <p>{{ $t("For all questions, please contact technical support") }}</p>
    <!-- <a href="#" class="link_blue">Купить</a> -->
  </div>
</template>

<script>
export default {
  props: {
    textIndex: Number,
  },
  data() {
    return {
      texts: [
        this.$t(
          "Unfortunately, at the moment you can not view the profiles of other participants. Since your account has not been activated"
        ),
        this.$t(
          "Unfortunately, at the moment you can not view the profiles of other participants. Since you have not purchased a tariff plan"
        ),
      ],
    };
  },
};
</script>
