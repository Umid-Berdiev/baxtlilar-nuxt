<template>
  <section class="mobile_menu" style="width: 100%">
    <div class="container">
      <div class="template_main" id="main">
        <div class="sidebar_template" id="left-sidebar">
          <user-menu />
          <forum />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Forum from "../cards/Forum.vue";
import UserMenu from "../cards/UserMenu.vue";
export default {
  components: { UserMenu, Forum },
};
</script>
