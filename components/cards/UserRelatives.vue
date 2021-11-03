<template>
  <div>
    <h1>{{ $t('family') }}</h1>
    <loader v-if="loading" />
    <h3 v-else-if="relatives.length == 0" class="text-center">
      {{ $t('empty_data') }}
    </h3>
    <div class="pret_main" v-else>
      <div
        class="about_user_pret full"
        v-for="item in relatives"
        :key="item.id"
      >
        <span>{{ $t(item.relationship_type) }}</span>
        <span>{{ item.fio }}</span>
        <span>{{ item.profession }}</span>
        <span>{{ item.age }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Loader from '../Loader.vue'

export default {
  components: { Loader },
  props: {
    relatives: [],
  },
  data() {
    return {
      loading: false,
      // relatives: [],
    }
  },
  // async mounted() {
  //   this.loading = true;
  //   console.log("from UserRelatives: ", this.user_id);
  //   this.loading = false;
  // },
  methods: {
    ...mapActions(['fetchRelatives']),
  },
}
</script>
