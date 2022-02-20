<template>
  <div class="item_user_card" v-if="!displayNone">
    <NuxtLink :to="localePath('/users/' + user.id)" class="item_user_card_img">
      <img :src="user.photo" alt />
    </NuxtLink>
    <div class="item_user_card_text_1">
      <h3>
        <NuxtLink :to="localePath('/users/' + user.id)">{{ user.username }}</NuxtLink>
      </h3>
      <p>{{ user.place_of_residence }}</p>
      <p>{{ user.age }}</p>
      <icon-status :status="user.status" />
    </div>
    <div class="item_user_card_text_2" :id="'user-card-' + user.id">
      <div class="heigh_weight">
        <p>{{ $t("height") + ": " + user.height + " см" }}</p>
        <p>{{ $t("weight") + ": " + user.weight + " кг" }}</p>
      </div>
      <p>{{ user.citizenship ? $t("citizenship") + ": " + user.citizenship.name : $t("citizenship") + ": " + user.country_name }}</p>
      <p>{{ $t("religion") + ": " + user.religion.name }}</p>
      <p>{{ user.education ? $t("education") + ": " + $t(user.education) : "" }}</p>
      <p>
        {{
          user.family_status
            ? $t("family_status") + ": " + $t(user.family_status)
            : ""
        }}
      </p>
    </div>
    <div class="btn_toggle_text" @click="toggle"></div>
    <FavouriteButton
      :user-id="user.id"
      :is-favourite="user.isFavourite"
      @hide-user="hideUser($event)"
    />
  </div>
</template>

<script>
import FavouriteButton from "../buttons/FavouriteButton.vue";
import IconStatus from "../icons/IconStatus.vue";

export default {
  components: { FavouriteButton, IconStatus },
  data() {
    return {
      displayNone: false,
      APP_URL: process.env.API_URL,
    };
  },
  props: {
    user: {
      type: Object,
      default: {},
    },
  },
  methods: {
    toggle(event) {
      let cardElement = document.getElementById("user-card-" + this.user_id);
      event.preventDefault();
      DOMAnimations.slideToggle(cardElement);
    },
    hideUser(payload) {
      this.displayNone = payload;
    },
  },
};

let DOMAnimations = {
  /**
   * SlideUp
   *
   * @param {HTMLElement} element
   * @param {Number} duration
   * @returns {Promise<boolean>}
   */
  slideUp: function (element, duration = 500) {
    return new Promise(function (resolve, reject) {
      element.style.height = element.offsetHeight + "px";
      element.style.transitionProperty = `height, margin, padding`;
      element.style.transitionDuration = duration + "ms";
      element.offsetHeight;
      element.style.overflow = "hidden";
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      window.setTimeout(function () {
        element.style.display = "none";
        element.style.removeProperty("height");
        element.style.removeProperty("padding-top");
        element.style.removeProperty("padding-bottom");
        element.style.removeProperty("margin-top");
        element.style.removeProperty("margin-bottom");
        element.style.removeProperty("overflow");
        element.style.removeProperty("transition-duration");
        element.style.removeProperty("transition-property");
        resolve(false);
      }, duration);
    });
  },

  /**
   * SlideDown
   *
   * @param {HTMLElement} element
   * @param {Number} duration
   * @returns {Promise<boolean>}
   */
  slideDown: function (element, duration = 500) {
    return new Promise(function (resolve, reject) {
      element.style.removeProperty("display");
      let display = window.getComputedStyle(element).display;

      if (display === "none") display = "block";

      element.style.display = display;
      let height = element.offsetHeight;
      element.style.overflow = "hidden";
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      element.offsetHeight;
      element.style.transitionProperty = `height, margin, padding`;
      element.style.transitionDuration = duration + "ms";
      element.style.height = height + "px";
      element.style.removeProperty("padding-top");
      element.style.removeProperty("padding-bottom");
      element.style.removeProperty("margin-top");
      element.style.removeProperty("margin-bottom");
      window.setTimeout(function () {
        element.style.removeProperty("height");
        element.style.removeProperty("overflow");
        element.style.removeProperty("transition-duration");
        element.style.removeProperty("transition-property");
      }, duration);
    });
  },

  /**
   * SlideToggle
   *
   * @param {HTMLElement} element
   * @param {Number} duration
   * @returns {Promise<boolean>}
   */
  slideToggle: function (element, duration = 500) {
    if (window.getComputedStyle(element).display === "none") {
      return this.slideDown(element, duration);
    } else {
      return this.slideUp(element, duration);
    }
  },
};
</script>
