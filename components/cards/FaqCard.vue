<template>
  <div class="accordion-item card">
    <p class="accordion-header" :id="'heading-' + item.id">
      <button
        class="accordion-button card-header bg-white"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapse-' + item.id"
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
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body card-body">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>
