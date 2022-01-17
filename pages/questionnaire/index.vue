<template>
  <div class="anceta_form">
    <div class="steps_form">
      <div class="active">{{ $t("fill_data") }}</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
    <h2>{{ $t("fill_questionnaire") }}</h2>
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="row">
        <div class="col-sm-8">
          <div class="form-group">
            <label for="fullname" id="fullname-label">{{ $t("fio") }}</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              @input="fullnameError = ''"
              :placeholder="$t('fill')"
            />
            <span class="text-danger">{{ fullnameError }}</span>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="username">{{ $t("nikname") }}</label>
            <input
              type="text"
              name="username"
              id="username"
              :placeholder="$t('Username...')"
              disabled
              :value="currentUser.username"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="#" id="country-label">{{ $t("country_residence") }}</label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              name="place_of_residence"
              @change="selectCountry"
              class="form-control"
            >
              <a-select-option
                v-for="country in getCountries"
                :key="country.key"
                :value="country.id"
              >{{ country.name }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ countryError }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="#" id="region-label">{{ $t("city_residence") }}</label>
            <a-select
              :showSearch="false"
              :placeholder="$t('choose')"
              @change="selectRegion"
              class="form-control"
            >
              <a-select-option
                v-for="item in getRegions"
                :key="item.id"
                :value="item.id"
              >{{ item.name }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ regionError }}</span>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label for="birthday" id="birthday-label">{{ $t("birth_date") }}</label>
            <a-date-picker
              :placeholder="$t('select_date')"
              format="YYYY-MM-DD"
              name="birthday"
              id="birthday"
              class="datepicker form-control"
              @change="birthdayError = ''"
            />
            <span class="text-danger">{{ birthdayError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <label id="citizinship_country-label">{{ $t("citizenship") }}</label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              name="citizenship_country_id"
              @change="selectCitizen"
              class="form-control"
            >
              <a-select-option
                v-for="country in getCountries"
                :key="country.key"
                :value="country.id"
              >{{ country.name }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ citizenship_countryError }}</span>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="religion" id="religion-label">
              {{
                $t("religion")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              name="religion_id"
              @change="selectRelegion"
              class="form-control"
            >
              <a-select-option
                v-for="relegion in getReligions"
                :key="relegion.id"
                :value="relegion.id"
              >{{ relegion.name }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ religionError }}</span>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for="religious_attitude" id="religious_attitude-label">
              {{
                $t("relation_religion")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              name="religious_attitude"
              @change="selectRelegiousAttitude"
              class="form-control"
            >
              <a-select-option value="high">{{ $t("high") }}</a-select-option>
              <a-select-option value="medium">{{ $t("medium") }}</a-select-option>
              <a-select-option value="not">{{ $t("not") }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ religious_attitudeError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <div class="form-group">
            <label for="height" id="height-label">{{ $t("height") }}</label>
            <div class="row">
              <div class="col-6">
                <a-select
                  :placeholder="$t('choose')"
                  :showSearch="false"
                  name="height"
                  @change="selectHeight"
                  class="form-control"
                >
                  <a-select-option
                    v-for="item in 171"
                    :key="item + 49"
                    :value="item + 49"
                  >{{ item + 49 }}</a-select-option>
                </a-select>
                <span class="text-danger">{{ heightError }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="form-group">
            <label for id="weight-label">{{ $t("weight") }}</label>
            <div class="row">
              <div class="col-6">
                <a-select
                  :placeholder="$t('choose')"
                  :showSearch="false"
                  name="weight"
                  @change="selectWeight"
                  class="form-control"
                >
                  <a-select-option
                    v-for="item in 161"
                    :key="item + 39"
                    :value="item + 39"
                  >{{ item + 39 }}</a-select-option>
                </a-select>
                <span class="text-danger">{{ weightError }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="form-group">
            <label for="zodiac-sign" id="znak_zodiak-label">
              {{
                $t("zodiac_sign")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              name="znak_zodiak"
              @change="selectZnakZodiak"
              class="form-control"
            >
              <a-select-option value="Aquarius">{{ $t("Aquarius") }}</a-select-option>
              <a-select-option value="Sagittarius">{{ $t("Sagittarius") }}</a-select-option>
              <a-select-option value="Leo">{{ $t("Leo") }}</a-select-option>
              <a-select-option value="Aries">{{ $t("Aries") }}</a-select-option>
              <a-select-option value="Taurus">{{ $t("Taurus") }}</a-select-option>
              <a-select-option value="Virgo">{{ $t("Virgo") }}</a-select-option>
              <a-select-option value="Capricorn">{{ $t("Capricorn") }}</a-select-option>
              <a-select-option value="Gemini">{{ $t("Gemini") }}</a-select-option>
              <a-select-option value="Libra">{{ $t("Libra") }}</a-select-option>
              <a-select-option value="Cancer">{{ $t("Cancer") }}</a-select-option>
              <a-select-option value="Scorpio">{{ $t("Scorpio") }}</a-select-option>
              <a-select-option value="Pisces">{{ $t("Pisces") }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ znak_zodiakError }}</span>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="form-group">
            <label for id="eye_color-label">{{ $t("eye_color") }}</label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              name="eye_color"
              v-model="selects.eye_color"
              @change="selectEyeColor"
              class="form-control"
            >
              <a-select-option
                v-for="item in colors"
                :key="item"
                :value="item"
              >{{ $t(item) }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ eye_colorError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="form-group">
            <label for id="about-label">{{ $t("about_yourself") }}</label>
            <textarea name="about" :placeholder="$t('about_yourself')"></textarea>
            <span class="text-danger">{{ aboutError }}</span>
          </div>
        </div>
      </div>

      <h2>{{ $t("photos_count") }}</h2>
      <the-upload-image
        :fileList.sync="images"
        @update-list="updateImagesList"
      />
      <span class="text-danger">{{ imagesError }}</span>
      <br />
      <div class="is_photo_visible">
        <div class="radio_button allget" id="images-label">
          <input name="image_status" value="1" type="checkbox" id="ada1" />

          <label for="ada1">{{ $t("blur_photos") }}</label>
        </div>
        <p>{{ $t("blur_photo_less") }}</p>
      </div>
      <div class="new_add_l">
        <button type="submit" class="link_blue" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp;
          <span class="text-white">{{ $t("next") }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";
import countrySelect from "@/components/selects/countrySelect.vue";
import ReligionSelect from "@/components/selects/religionSelect.vue";
import TheUploadImage from "~/components/TheUploadImage.vue";

export default {
  layout: "questionnaire",
  data() {
    return {
      loading: false,
      urls: [],
      images: [],
      colors: [
        "Синий",
        "Голубой",
        "Серый",
        "Зелёный",
        "Буро-жёлто-зелёный",
        "Жёлтые",
        "Карий",
      ],
      selects: {
        citizenship_country_id: null,
        religion_id: null,
        religious_attitude: null,
        height: null,
        weight: null,
        znak_zodiak: null,
        eye_color: null,
        place_of_residence: null,
        place_of_birth_region_id: null,
      },
      fullnameError: "",
      birthdayError: "",
      countryError: "",
      regionError: "",
      citizenship_countryError: "",
      religionError: "",
      religious_attitudeError: "",
      heightError: "",
      weightError: "",
      znak_zodiakError: "",
      eye_colorError: "",
      aboutError: "",
      imagesError: "",
    };
  },
  components: { countrySelect, ReligionSelect, TheUploadImage },
  computed: {
    ...mapGetters([
      "getSelectedCountry",
      "getCountries",
      "getReligions",
      "getRegions",
    ]),
    currentUser() {
      return this.$auth.user;
    },
  },
  mounted() {
    this.fetchReligions();
    this.fetchCountries();
  },
  methods: {
    ...mapActions(["fetchReligions", "fetchCountries", "fetchRegions"]),
    async submit(e) {
      if (this.validate(e)) {
        this.loading = true;

        const formData = new FormData(e.target);
        let values = Object.fromEntries(formData);

        values.place_of_residence = this.place_of_residence;
        values.place_of_birth_region_id = this.place_of_birth_region_id;

        values.images = this.images.map((image) => image.thumbUrl);
        values = { ...values, ...this.selects };
        const res = await this.$store.dispatch(
          "questionnaireModule/saveUserQuestionnaire",
          values
        );

        if (res.message == "Success") {
          // await this.$store.commit("auth/setUser", res.user);
          this.$router.push(this.localePath("/questionnaire/second-part"));
        } else {
          this.loading = false;
          alert(res.message);
        }
      }
    },

    validate(e) {
      let result = true;
      if (_.isEmpty(this.images)) {
        this.imagesError = this.$t("Required field");
        document.getElementById("images-label").scrollIntoView();
        result = false;
      }
      if (e.target.about.value == "") {
        this.aboutError = this.$t("Required field");
        document.getElementById("about-label").scrollIntoView();
        result = false;
      }
      if (this.selects.eye_color == null) {
        this.eye_colorError = this.$t("Required field");
        document.getElementById("eye_color-label").scrollIntoView();
        result = false;
      }
      if (this.selects.znak_zodiak == null) {
        this.znak_zodiakError = this.$t("Required field");
        document.getElementById("znak_zodiak-label").scrollIntoView();
        result = false;
      }
      if (this.selects.weight == null) {
        this.weightError = this.$t("Required field");
        document.getElementById("weight-label").scrollIntoView();
        result = false;
      }
      if (this.selects.height == null) {
        this.heightError = this.$t("Required field");
        document.getElementById("height-label").scrollIntoView();
        result = false;
      }
      if (this.selects.religious_attitude == null) {
        this.religious_attitudeError = this.$t("Required field");
        document.getElementById("religious_attitude-label").scrollIntoView();
        result = false;
      }
      if (this.selects.religion_id == null) {
        this.religionError = this.$t("Required field");
        document.getElementById("religion-label").scrollIntoView();
        result = false;
      }
      if (this.selects.citizenship_country_id == null) {
        this.citizenship_countryError = this.$t("Required field");
        document.getElementById("citizinship_country-label").scrollIntoView();
        result = false;
      }
      if (this.selects.place_of_residence == null) {
        this.countryError = this.$t("Required field");
        document.getElementById("country-label").scrollIntoView();
        result = false;
      }
      if (this.selects.place_of_birth_region_id == null) {
        this.regionError = this.$t("Required field");
        document.getElementById("region-label").scrollIntoView();
        result = false;
      }
      if (e.target.birthday.value == "") {
        this.birthdayError = this.$t("Required field");
        document.getElementById("birthday-label").scrollIntoView();
        result = false;
      }
      if (e.target.fullname.value == "") {
        this.fullnameError = this.$t("Required field");
        document.getElementById("fullname-label").scrollIntoView();
        result = false;
      }
      return result;
    },

    selectCitizen(value) {
      this.citizenship_countryError = "";
      this.selects.citizenship_country_id = value;
    },
    selectRelegion(value) {
      this.religionError = "";
      this.selects.religion_id = value;
    },
    selectRelegiousAttitude(value) {
      this.religious_attitudeError = "";
      this.selects.religious_attitude = value;
    },
    selectHeight(value) {
      this.heightError = "";
      this.selects.height = value;
    },
    selectWeight(value) {
      this.weightError = "";
      this.selects.weight = value;
    },
    selectZnakZodiak(value) {
      this.znak_zodiakError = "";
      this.selects.znak_zodiak = value;
    },
    selectEyeColor(value) {
      this.eye_colorError = "";
      this.selects.eye_color = value;
    },
    async selectCountry(value) {
      this.countryError = "";
      await this.fetchRegions(value);
      this.selects.place_of_residence = value;
    },
    selectRegion(value) {
      this.regionError = "";
      this.selects.place_of_birth_region_id = value;
    },
    updateImagesList(arr) {
      this.images = arr;
    },
  },
};
</script>
