<template>
  <section class="how_it_works">
    <div class="container">
      <h2 class="title">{{ $t("how_it_works") }}</h2>
      <br />
      <div class="video_block">
        <img src="~/assets/images/jigitali.svg" alt="" />
        <div class="btn_open_modal iframe-container">
          <iframe class="responsive-iframe" :src="iframeUrl"></iframe>
        </div>
        <img src="~/assets/images/lady.svg" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    iframeUrl() {
      if (this.$i18n.locale == "uz") {
        return "https://www.youtube.com/embed/gsZCDxKow4E";
      }
      if (this.$i18n.locale == "ru") {
        return "https://www.youtube.com/embed/0fRQyDt8rlc";
      }
      return "https://www.youtube.com/embed/0fRQyDt8rlc";
    },
  },
};
</script>

<style>
.iframe-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 38.25%; /* 16:9 Aspect Ratio */
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
