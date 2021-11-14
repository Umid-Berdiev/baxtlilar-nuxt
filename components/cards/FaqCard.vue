<template>
  <b-card no-body>
    <b-card-header
      class="bg-white"
      :id="'heading-' + item.id"
      header-tag="header"
    >
      <button block v-b-toggle="'collapse-' + item.id">
        <h3>{{ $t(item.title) }}</h3>
      </button>
    </b-card-header>
    <b-collapse :id="'collapse-' + item.id" accordion="#faq-accordion">
      <div class="accordion-body card-body">
        {{ item.text }}
      </div>
    </b-collapse>
  </b-card>
  <!-- <div class="accordion-item card">
    <p class="accordion-header" :id="'heading-' + item.id">
      <button
        class="accordion-button card-header bg-white"
        type="button"
        data-toggle="collapse"
        :data-target="'#collapse-' + item.id"
        aria-expanded="false"
        :aria-controls="'collapse-' + item.id"
      >
        <h3>{{ $t(item.title) }}</h3>
      </button>
    </p>
    <div
      :id="'collapse-' + item.id"
      class="accordion-collapse collapse"
      :aria-labelledby="'heading-' + item.id"
      data-parent="#faq-accordion"
    >
      <div class="accordion-body card-body">
        {{ item.text }}
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>
