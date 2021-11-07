<template>
  <section class="card_section">
    <div class="container">
      <div class="template_main" id="main">
        <div class="container">
          <h1 v-if="error && error.statusCode === 404">Page not found</h1>
          <h1 v-else>An error occurred</h1>
          <NuxtLink to="/">Home page</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "auth",
  props: ["error"],
};
</script>
