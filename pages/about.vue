<template>
  <div class="template_main_right" id="content">
    <div class="block_top_about">
      <user-images-slider :user_id="user_id" />
      <user-main :user="currentUser" />
    </div>
    <loader v-if="loading" />
    <div class="block_tab" v-else>
      <div class="links">
        <favourite-button
          :user_id="user_id"
          :isFavourite="currentUser.isFavourite"
          :showX="false"
        />
        <!-- <a href="#" class="close_user_card">
          <icon-x />
        </a> -->
      </div>
      <div class="tabs">
        <ul id="tabs-nav">
          <li>
            <a href="#tab1">{{ $t('about_myself') }}</a>
          </li>
          <li>
            <a href="#tab2">{{ $t('family') }}</a>
          </li>
          <li>
            <a href="#tab3">{{ $t('answers_for') }} {{ $t('questions') }}</a>
          </li>
        </ul>
        <div id="tabs-content">
          <div id="tab1" class="tab-content">
            <user-data :user="currentUser" />
          </div>
          <div id="tab2" class="tab-content">
            <user-relatives :user_id="user_id" />
          </div>
          <div id="tab3" class="tab-content">
            <user-answers :user_id="user_id" />
          </div>
          <offer-status
            :user_id="user_id"
            :offer_status="currentUser.offer_status"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FavouriteButton from '@/components/buttons/FavouriteButton.vue'
import UserAnswers from '@/components/cards/UserAnswers.vue'
import UserData from '@/components/cards/UserData.vue'
import UserMain from '@/components/cards/UserMain.vue'
import UserRelatives from '@/components/cards/UserRelatives.vue'
import IconX from '@/components/icons/IconX.vue'
import Loader from '@/components/Loader.vue'
import UserImagesSlider from '@/components/sliders/UserImagesSlider.vue'
import OfferStatus from '@/components/buttons/OfferStatus.vue'

export default {
  components: {
    UserImagesSlider,
    UserAnswers,
    UserRelatives,
    UserData,
    UserMain,
    FavouriteButton,
    Loader,
    IconX,
    OfferStatus,
  },
  async created() {
    this.loading = true
    await this.fetchUserById(this.user_id)
    this.loading = false
  },
  computed: {
    ...mapGetters({ currentUser: 'getCurrentUser' }),
  },
  data() {
    return {
      loading: false,
      user_id: this.$route.params.id,
      // currentUser: {},
    }
  },
  methods: {
    ...mapActions(['fetchUserById']),
  },
}
</script>
style>
