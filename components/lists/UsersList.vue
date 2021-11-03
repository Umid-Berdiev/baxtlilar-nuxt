<template>
  <div>
    <h3 v-if="users.length == 0" class="text-center">{{ $t('empty_data') }}</h3>
    <user-card v-else v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import UserCard from '../cards/UserCard.vue'
import Loader from '../Loader.vue'

export default {
  components: { UserCard, Loader },
  props: {
    users: Array,
  },
}
</script>
