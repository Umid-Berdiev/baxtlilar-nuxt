<template>
  <nuxt-link :to="localePath('/news-detail') + '/' + item.id" class="card">
    <img :src="imageUrl + item.image" class="card-img-top" alt="news-image" />
    <div class="card-body text-center">
      <h5 class="card-title">{{ $t(item.title) }}</h5>
      <p class="card-text">
        {{ $t(item.description.substr(0, 100) + "...") }}
      </p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      imageUrl: `${process.env.API_URL}/public/uploads/news/`,
    };
  },
};
</script>
