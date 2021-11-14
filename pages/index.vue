<template>
  <div id="main">
    <section class="enter_site">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="enter_site_left">
              <h1>
                {{ $t("find_happiness") }} <br />{{ $t("along_Baxtlilar") }}
              </h1>
              <p>{{ $t("site_for_seriously_relationships") }}</p>
              <a href="#">{{ $t("details") }}</a>
            </div>
          </div>
          <div class="col-lg-6">
            <register-form />
          </div>
        </div>
      </div>
    </section>

    <how-it-works id="how-does-it-work" />

    <news-list />

    <faq-accordion id="faq-courses" />

    <the-footer />
  </div>
</template>

<script>
import HowItWorks from "~/components/HowItWorks.vue";
import FaqAccordion from "@/components/accordions/FaqAccordion.vue";
import NewsList from "@/components/lists/NewsList.vue";
import TheFooter from "@/components/blocks/TheFooter.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";

export default {
  layout: "auth",
  middleware: "guest",
  components: {
    HowItWorks,
    FaqAccordion,
    NewsList,
    TheFooter,
    RegisterForm,
  },
};
</script>
