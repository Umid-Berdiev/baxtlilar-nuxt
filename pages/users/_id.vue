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
        <!-- <a href="javascript:;" class="close_user_card">
          <icon-x />
        </a>-->
      </div>
      <div class="tabs">
        <ul id="tabs-nav">
          <li>
            <a
              href="#tab1"
              :class="{ 'text-dark': $route.hash === '#tab1' || $route.hash === '' }"
            >{{ $t('about_myself') }}</a>
          </li>
          <li>
            <a
              href="#tab2"
              :class="{ 'text-dark': $route.hash === '#tab2' }"
            >{{ $t('family') }}</a>
          </li>
          <li>
            <a
              href="#tab3"
              :class="{ 'text-dark': $route.hash === '#tab3' }"
            >{{ $t('answers_for') }} {{ $t('questions') }}</a>
          </li>
        </ul>
        <div id="tabs-content">
          <div id="tab1" class="tab-content">
            <UserData :user="currentUser" />
          </div>
          <div id="tab2" class="tab-content">
            <UserRelatives :relatives="relatives" />
          </div>
          <div id="tab3" class="tab-content">
            <UserAnswers :answers="answers" />
          </div>
          <OfferStatus
            :user-id="user_id"
            :offer-status="currentUser.offer_status"
            :btn-class="btnClass"
          />
        </div>
      </div>
    </div>
    <OfferModal :user-id="user_id" @update:button-class="btnClass = $event" />
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
import OfferModal from '~/components/modals/OfferModal.vue'

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
    OfferModal
  },
  async created() {
    this.loading = true
    await this.fetchUserById(this.user_id)
    this.loading = false
  },
  async mounted() {
    const relatives = await this.$store.dispatch("fetchRelatives", this.user_id);
    const answers = await this.$store.dispatch("fetchAnswers", this.user_id);
    this.relatives = [...relatives] || [];
    this.answers = [...answers] || [];
  },
  data() {
    return {
      loading: false,
      user_id: Number(this.$route.params.id),
      relatives: [],
      answers: [],
      btnClass: 'link_blue'
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'getCurrentUser' }),
  },
  methods: {
    ...mapActions(['fetchUserById']),
  },
}
</script>
