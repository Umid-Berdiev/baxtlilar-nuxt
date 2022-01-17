<template>
  <div class="sidebar_top" v-if="currentUser">
    <div class="avatar_user">
      <img :src="API_URL + currentUser.photo" alt />
    </div>
    <h4 v-text="currentUser.fullname"></h4>
    <div class="status_user">
      <div class="link_svg not_link">
        <icon-status :status="currentUser.status" />
      </div>
      <div class="link_svg not_link">
        <icon-vip />VIP
      </div>
    </div>
    <nuxt-link :to="localePath('/home')" class="link_svg">
      <icon-home />
      {{ $t("main") }}
    </nuxt-link>
    <nuxt-link :to="localePath('/personal-blog')" class="link_svg">
      <icon-person />
      {{ $t("self_cabinet") }}
    </nuxt-link>
    <nuxt-link
      :to="localePath('/messages')"
      class="link_svg has_notification"
      :data-count-notif="newMessageNotifications.length"
    >
      <icon-chat />
      {{ $t("chats") }}
    </nuxt-link>
    <nuxt-link :to="localePath('/recipt')" class="link_svg">
      <icon-users />
      {{ $t("offers") }}
    </nuxt-link>
    <nuxt-link :to="localePath('/favourite')" class="link_svg">
      <icon-star />
      {{ $t("favourites") }}
    </nuxt-link>
    <nuxt-link
      :to="localePath('/notifications')"
      class="link_svg has_notification"
      :data-count-notif="otherNotifications.length"
    >
      <icon-bell />
      {{ $t("notifications") }}
    </nuxt-link>
    <nuxt-link :to="localePath('/tariffs')" class="link_svg">
      <icon-currency-dollar-circle />
      {{ $t("tariffs") }}
    </nuxt-link>
    <nuxt-link :to="localePath('/settings')" class="link_svg">
      <icon-gear />
      {{ $t("settings") }}
    </nuxt-link>
    <nuxt-link :to="localePath('/support')" class="link_svg">
      <icon-question-circle />
      {{ $t("support") }}
    </nuxt-link>
  </div>
</template>

<script>
import IconBell from "@/components/icons/IconBell.vue";
import IconChat from "@/components/icons/IconChat.vue";
import IconCurrencyDollarCircle from "@/components/icons/IconCurrencyDollarCircle.vue";
import IconGear from "@/components/icons/IconGear.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconPerson from "@/components/icons/IconPerson.vue";
import IconQuestionCircle from "@/components/icons/IconQuestionCircle.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconVerifiedAccount from "@/components/icons/IconVerifiedAccount.vue";
import IconVip from "@/components/icons/IconVip.vue";
import { mapActions, mapGetters } from "vuex";
import IconStatus from "../icons/IconStatus.vue";

export default {
  components: {
    IconVerifiedAccount,
    IconHome,
    IconVip,
    IconPerson,
    IconChat,
    IconUsers,
    IconStar,
    IconBell,
    IconCurrencyDollarCircle,
    IconGear,
    IconQuestionCircle,
    IconStatus,
  },
  data() {
    return {
      API_URL: process.env.API_URL,
    };
  },
  async mounted() {
    await this.fetchUnreadNotifications();

    const vm = this;

    this.$echo
      .private(
        "App.Models.User." + this.currentUser.id
        // "App.Models.User." + this.$auth.user.id
      )
      .notification((notification) => {
        vm.fetchUnreadNotifications();
      });
  },
  computed: {
    ...mapGetters({
      newMessageNotifications: "userModule/newMessageNotifications",
      otherNotifications: "userModule/otherNotifications",
    }),
    currentUser() {
      return this.$auth.user || {};
    },
  },
  methods: {
    ...mapActions({
      fetchUnreadNotifications: "userModule/fetchUnreadNotifications",
    }),
  },
};
</script>
