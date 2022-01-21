<template>
  <div class="template_main_right" id="content">
    <h1>{{ $t("tariffs") }}</h1>
    <div class="row">
      <div
        class="col-xl-4 col-sm-6"
        v-for="(item, index) in getTariffList.filter((el) => el.is_free == 0)"
        :key="index"
      >
        <div
          class="tariff_item basic_plan"
          :style="'background-image: url(' + item.image_s + ')'"
        >
          <h5>{{ item.name }}</h5>
          <p>{{ $t("Days") }}: {{ item.day }}</p>
          <p>{{ $t("Reciprocity") }}: {{ item.reciprocity }}</p>
          <div class="tariff_price">{{ item.price }} сум</div>
          <a
            href="javascript:;"
            @click="payTariff(item.id)"
          >{{ $t("Select tariff") }}</a>
        </div>
      </div>
      <div class="col-xl-4 col-sm-6">
        <div class="tariff_item premium_plan">
          <h5>{{ $t("Premium") }}</h5>
          <p>{{ $t("Individual approach and guarantee of finding a pair") }}</p>
          <nuxt-link to="tariffs/premium-tariffs">{{ $t("details") }}</nuxt-link>
        </div>
      </div>
      <div
        class="col-xl-8 col-sm-12"
        v-for="(item, index) in getTariffList.filter((el) => el.is_free != 0)"
        :key="index + '-free'"
      >
        <div
          class="tariff_item daily_plan"
          :style="'background-image: url(' + item.image_s + ')'"
        >
          <h5>{{ item.name }}</h5>

          <p>{{ item.description }}</p>
          <a
            href="javascript:;"
            @click="freeTariff(item.id)"
          >{{ $t("Select tariff") }}</a>
        </div>
      </div>
    </div>

    <success-modal
      :success="isSuccess"
      :text="modalText ? $t(modalText) : ''"
      :loading="modalLoading"
    />

    <payment-modal :type="type" @paymentFailed="paymentError($event)" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PaymentModal from "@/components/modals/PaymentModal.vue";
import SuccessModal from "@/components/modals/SuccessModal.vue";

export default {
  components: { SuccessModal, PaymentModal },
  data() {
    return {
      isSuccess: true,
      modalText: "",
      modalLoading: false,
      type: null,
    };
  },
  async asyncData({ store, app }) {
    await store.dispatch("fetchTariffList", app.i18n.locale);
  },
  methods: {
    ...mapActions(["fetchFreeTariff"]),
    async freeTariff(tariff_id) {
      this.modalLoading = true;
      const user = this.$auth.user;
      this.$bvModal.show("success-modal");
      const res = await this.fetchFreeTariff({
        user_id: user.id,
        tariff_id,
        lang: this.$i18n.locale,
      });
      this.isSuccess = res.status;
      this.modalText = res.message;
      this.modalLoading = false;
    },
    payTariff(tariff_id) {
      this.type = tariff_id;
      this.$bvModal.show("payment-modal");
    },
    paymentError(payload) {
      this.isSuccess = payload.isSuccess;
      this.modalText = payload.text;
    },
  },
  computed: {
    ...mapGetters(["getTariffList"]),
  },
};
</script>

<style scoped>
.premium_plan {
  background-image: url("~assets/images/plan_5.jpg");
}
</style>
