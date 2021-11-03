<template>
  <form
    @submit.prevent="submit"
    class="anceta_form"
    enctype="multipart/form-data"
  >
    <!-- <input type="hidden" name="update" :value="true" />
    <div class="row">
      <div class="col-sm-8">
        <div class="form-group">
          <label for="fullname" id="fullname-label">
            {{ $t('fio') }}
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            :value="user.fullname"
            @input="fullnameError = ''"
          />
          <span class="text-danger">{{ fullnameError }}</span>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="username">
            {{ $t('nikname') }}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            :placeholder="$t('Username...')"
            required
            :value="user.username"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for="#">{{ $t('country_residence') }} </label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            name="place_of_residence"
            @change="selectCountry"
            :value="user.country?.id"
            class="form-control"
          >
            <a-select-option
              v-for="country in getCountries"
              :key="country.key"
              :value="country.id"
            >
              {{ country.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for="#">{{ $t('city_residence') }} </label>
          <a-select
            :showSearch="false"
            :placeholder="$t('choose')"
            @change="selectRegion"
            class="form-control"
            :value="user.place_of_birth_region_id"
          >
            <a-select-option
              v-for="item in getRegions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group">
          <label for="birthday">
            {{ $t('birth_date') }}
          </label>
          <a-date-picker
            :placeholder="$t('select_date')"
            format="YYYY-MM-DD"
            name="birthday"
            id="birthday"
            class="datepicker form-control"
            @value="userBirthdate"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label>
            {{ $t('citizenship') }}
          </label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            name="citizenship_country_id"
            :value="user.citizenship?.id"
            @change="selectCitizen"
            class="form-control"
          >
            <a-select-option
              v-for="country in getCountries"
              :key="country.key"
              :value="country.id"
            >
              {{ country.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t('religion') }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            name="religion_id"
            @change="selectRelegion"
            :value="user.religion_id"
            class="form-control"
          >
            <a-select-option
              v-for="relegion in getReligions"
              :key="relegion.id"
              :value="relegion.id"
            >
              {{ relegion.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="#">{{ $t('relation_religion') }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            name="religious_attitude"
            @change="selectRelegiousAttitude"
            :value="user.religious_attitude"
            class="form-control"
          >
            <a-select-option value="high">
              {{ $t('high') }}
            </a-select-option>
            <a-select-option value="medium">
              {{ $t('medium') }}
            </a-select-option>
            <a-select-option value="not">
              {{ $t('not') }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <div class="form-group">
          <label for="">{{ $t('height') }}</label>
          <div class="row">
            <div class="col-6">
              <a-select
                :placeholder="$t('choose')"
                :showSearch="false"
                name="height"
                :value="user.height"
                @change="selectHeight"
                class="form-control"
              >
                <a-select-option
                  v-for="item in 171"
                  :key="item + 49"
                  :value="item + 49"
                >
                  {{ item + 49 }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="form-group">
          <label for="">{{ $t('weight') }}</label>
          <div class="row">
            <div class="col-6">
              <a-select
                :placeholder="$t('choose')"
                :showSearch="false"
                name="weight"
                :value="user.weight"
                @change="selectWeight"
                class="form-control"
              >
                <a-select-option
                  v-for="item in 161"
                  :key="item + 39"
                  :value="item + 39"
                >
                  {{ item + 39 }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="form-group">
          <label for="zodiac-sign">{{ $t('zodiac_sign') }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            name="znak_zodiak"
            :value="user.znak_zodiak"
            @change="selectZnakZodiak"
            class="form-control"
          >
            <a-select-option value="Aquarius">
              {{ $t('Aquarius') }}
            </a-select-option>
            <a-select-option value="Sagittarius">
              {{ $t('Sagittarius') }}
            </a-select-option>
            <a-select-option value="Leo">
              {{ $t('Leo') }}
            </a-select-option>
            <a-select-option value="Aries">
              {{ $t('Aries') }}
            </a-select-option>
            <a-select-option value="Taurus">
              {{ $t('Taurus') }}
            </a-select-option>
            <a-select-option value="Virgo">
              {{ $t('Virgo') }}
            </a-select-option>
            <a-select-option value="Capricorn">
              {{ $t('Capricorn') }}
            </a-select-option>
            <a-select-option value="Gemini">
              {{ $t('Gemini') }}
            </a-select-option>
            <a-select-option value="Libra">
              {{ $t('Libra') }}
            </a-select-option>
            <a-select-option value="Cancer">
              {{ $t('Cancer') }}
            </a-select-option>
            <a-select-option value="Scorpio">
              {{ $t('Scorpio') }}
            </a-select-option>
            <a-select-option value="Pisces">
              {{ $t('Pisces') }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="form-group">
          <label for="">{{ $t('eye_color') }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            name="eye_color"
            v-model="eye_color"
            :value="user.eye_color"
            @change="selectEyeColor"
            class="form-control"
          >
            <a-select-option v-for="item in colors" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group">
          <label for="">{{ $t('about_yourself') }}</label>
          <textarea
            name="about_myself"
            :placeholder="$t('about_yourself')"
            :value="user.about"
          ></textarea>
        </div>
      </div>
    </div>
    <h2>{{ $t('photos_count') }}</h2>
    <upload-image :fileList="images" :type="'personal'" />
    <br />
    <div class="is_photo_visible">
      <div class="radio_button allget">
        <input name="image_status" value="1" type="checkbox" id="ada1" />
        <label for="ada1">{{ $t('blur_photos') }}</label>
      </div>
      <p>
        {{ $t('blur_photo_less') }}
      </p>
    </div>
    <div class="new_add_l">
      <button type="submit" class="link_blue" :disabled="loading">
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm text-white"
        ></span>
        &nbsp;
        <span class="text-white">{{ $t('save') }}</span>
      </button>
    </div> -->
  </form>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import countrySelect from '@/components/selects/countrySelect.vue'
import ReligionSelect from '@/components/selects/religionSelect.vue'
import UploadImage from '@/components/UploadImage.vue'
import moment from 'moment'
import UserImagesSlider from '../sliders/UserImagesSlider.vue'
import { Modal } from 'bootstrap'

export default {
  props: { user: Object },
  data() {
    return {
      loading: false,
      urls: [],
      images: [],
      colors: [
        'Синий',
        'Голубой',
        'Серый',
        'Зелёный',
        'Буро-жёлто-зелёный',
        'Жёлтые',
        'Карий',
      ],
      fullnameError: '',
      selects: {},
    }
  },
  components: {
    countrySelect,
    ReligionSelect,
    UploadImage,
    UserImagesSlider,
  },
  computed: {
    ...mapGetters([
      'getSelectedCountry',
      'getCountries',
      'getReligions',
      'getRegions',
    ]),
    userBirthdate() {
      const formatedBirthDate = moment(this.user.birthday)

      return formatedBirthDate.format('YYYY-MM-DD') || null
    },
  },
  async mounted() {
    if (_.isEmpty(this.getCountries)) await this.fetchCountries()
    if (this.user) {
      this.selects = {
        citizenship_country_id: this.user.citizenship_country_id,
        place_of_birth_region_id: this.user.place_of_birth_region_id,
        place_of_residence: this.user.place_of_residence,
        religion_id: this.user.religion_id,
        religious_attitude: this.user.religious_attitude,
        height: this.user.height,
        weight: this.user.weight,
        znak_zodiak: this.user.znak_zodiak,
        eye_color: this.user.eye_color,
      }
      await this.fetchReligions()
      await this.fetchRegions(this.user.place_of_residence)
    }
  },
  methods: {
    ...mapActions(['fetchReligions', 'fetchRegions', 'fetchCountries']),
    async submit(e) {
      if (e.target.fullname.value == '') {
        this.fullnameError = "To'ldirish shart"
        document.getElementById('fullname-label').scrollIntoView()
      } else {
        this.loading = true
        const formData = new FormData(e.target)
        let values = Object.fromEntries(formData)
        if (!values.image_status) {
          values.image_status = 0
        }
        values.place_of_residence = this.place_of_residence
        values.place_of_birth_region_id = this.place_of_birth_region_id
        values.images = this.images.map((image) => image.thumbUrl)
        values = { ...values, ...this.selects }

        const res = await this.$store.dispatch('saveUserQuestionnaire', values)

        if (res.message == 'Success') {
          const modal = Modal.getInstance(
            document.getElementById('setting-modal')
          )
          modal.show()
        } else alert(res.message)

        this.loading = false
      }
    },
    selectCitizen(value) {
      this.selects.citizenship_country_id = value
    },
    selectRelegion(value) {
      this.selects.religion_id = value
    },
    selectRelegiousAttitude(value) {
      this.selects.religious_attitude = value
    },
    selectHeight(value) {
      this.selects.height = value
    },
    selectWeight(value) {
      this.selects.weight = value
    },
    selectZnakZodiak(value) {
      this.selects.znak_zodiak = value
    },
    selectEyeColor(value) {
      this.selects.eye_color = value
    },
    selectCountry(value) {
      this.fetchRegions(value)
      this.selects.place_of_residence = value
    },
    selectRegion(value) {
      this.selects.place_of_birth_region_id = value
    },
  },
}
</script>
