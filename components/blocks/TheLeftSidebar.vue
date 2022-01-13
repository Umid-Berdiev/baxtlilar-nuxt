<template>
  <div class="sidebar_template" id="left-sidebar">
    <UserMenu />
    <nuxt-link :to="localePath('/tariffs')" class="to_premium">
      <h2>Premium</h2>
      <h2>200 000 сум</h2>
      <p v-text="$t('many_possibilities')" />
    </nuxt-link>
  </div>
</template>

<script>
import UserMenu from "../cards/UserMenu.vue";
import Forum from "../cards/Forum.vue";
export default {
  components: { UserMenu, Forum },
};
</script>

<style scoped>
.to_premium {
  background-image: url("~assets/images/intersect.png");
}
</style>
