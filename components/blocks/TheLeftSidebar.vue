<template>
  <div class="sidebar_template" id="left-sidebar">
    <user-menu />
    <a
      href="#"
      class="to_premium"
      style="background-image: url('../src/assets/images/intersect.png')"
    >
      <h2>Premium</h2>
      <h2>200 000 сум</h2>
      <p v-text="$t('many_possibilities')" />
    </a>
    <!-- <forum /> -->
  </div>
</template>

<script>
import UserMenu from "../cards/UserMenu.vue";
import Forum from "../cards/Forum.vue";
export default {
  components: { UserMenu, Forum },
};
</script>
