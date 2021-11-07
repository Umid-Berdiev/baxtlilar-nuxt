<template>
  <div class="anceta_form">
    <div class="steps_form">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div class="active">{{ $t("my_prefernces") }}</div>
      <div>5</div>
    </div>
    <h2>{{ $t("my_prefernces") }}</h2>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-4">
          <div class="form-group">
            <label for="" id="age-label">{{ $t("age") }} ( от ) ( до) </label>
            <div class="row">
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="from_age"
                  @input="from_ageError = ''"
                  max="99"
                  min="0"
                />
                <span class="text-danger">{{ from_ageError }}</span>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="up_to_age"
                  @input="up_to_ageError = ''"
                  max="99"
                  min="0"
                />
                <span class="text-danger">{{ up_to_ageError }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="#" id="country-label"
              >{{ $t("country_residence") }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              name="country_id"
              @change="selectCountry"
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
            <span class="text-danger">{{ countryError }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="#" id="region-label">{{ $t("city_residence") }} </label>
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
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <span class="text-danger">{{ regionError }}</span>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-10">
            <label for="">{{ $t("religion") }}</label>
            <div class="row">
              <div class="col-6" v-for="item in getReligions" :key="item.id">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="religion_id"
                    :value="item.id"
                    :id="'religion-' + item.id"
                  />
                  <label :for="'religion-' + item.id">{{ item.name }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="religion_id"
                    value="null"
                    checked
                    id="religion"
                  />
                  <label for="religion">{{ $t("doesnt_matter") }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-10">
            <label for="">{{ $t("family_status") }}</label>
            <div class="row">
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    id="family-status-1"
                    name="family_status"
                    value="single"
                  />
                  <label for="family-status-1">{{ $t("single") }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    id="family-status-3"
                    name="family_status"
                    value="divorced"
                  />
                  <label for="family-status-3">{{ $t("divorced") }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    id="family-status-4"
                    name="family_status"
                    value="widow"
                  />
                  <label for="family-status-4">{{ $t("widow") }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    id="family-status-2"
                    name="family_status"
                    value="-1"
                    checked
                  />
                  <label for="family-status-2">{{ $t("doesnt_matter") }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-10">
            <label for="">{{ $t("relation_smoking") }} </label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input type="radio" name="smoking" id="smoking-1" value="1" />
                  <label for="smoking-1">{{ $t("strongly_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input type="radio" name="smoking" id="smoking-2" value="2" />
                  <label for="smoking-2">{{ $t("not_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="smoking"
                    id="smoking-3"
                    checked
                    value="3"
                  />
                  <label for="smoking-3">{{ $t("doesnt_matter") }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-10">
            <label for="">{{ $t("relation_alcohol") }} </label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input type="radio" name="alcohol" id="alcohol-1" value="1" />
                  <label for="alcohol-1">{{ $t("strongly_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input type="radio" name="alcohol" id="alcohol-2" value="2" />
                  <label for="alcohol-2">{{ $t("not_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="alcohol"
                    id="alcohol-3"
                    checked
                    value="3"
                  />
                  <label for="alcohol-3">{{ $t("doesnt_matter") }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-10">
            <label for="">{{ $t("relation_drugs") }} </label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input type="radio" name="drugs" id="drug-1" value="1" />
                  <label for="drug-1">{{ $t("strongly_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input type="radio" name="drugs" id="drug-2" value="2" />
                  <label for="drug-2">{{ $t("not_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="drugs"
                    id="drug-3"
                    checked
                    value="3"
                  />
                  <label for="drug-3">{{ $t("doesnt_matter") }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-10">
            <label for="">{{ $t("financial_status") }} </label>
            <div class="row">
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="financial_status"
                    id="financial-status-1"
                    value="high"
                  />
                  <label for="financial-status-1">{{ $t("wealthy") }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="financial_status"
                    id="financial-status-3"
                    value="middle"
                  />
                  <label for="financial-status-3"
                    >{{ $t("middle_income") }}
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="financial_status"
                    id="financial-status-4"
                    value="low"
                  />
                  <label for="financial-status-4">{{
                    $t("little_income")
                  }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="financial_status"
                    id="financial-status-2"
                    value="-1"
                    checked
                  />
                  <label for="financial-status-2">{{
                    $t("doesnt_matter")
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="" id="height-label"
              >{{ $t("height") }} ( от ) ( до)
            </label>
            <div class="row">
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="from_height"
                  @input="from_heightError = ''"
                  max="250"
                  min="100"
                />
                <span class="text-danger">{{ from_heightError }}</span>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="up_to_height"
                  @input="up_to_heightError = ''"
                  max="250"
                  min="100"
                />
                <span class="text-danger">{{ up_to_heightError }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="" id="weight-label"
              >{{ $t("weight") }} ( от ) ( до)</label
            >
            <div class="row">
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="from_weight"
                  max="200"
                  min="30"
                  @input="from_weightError = ''"
                />
                <span class="text-danger">{{ from_weightError }}</span>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="up_to_weight"
                  @input="up_to_weightError = ''"
                  max="200"
                  min="30"
                />
                <span class="text-danger">{{ up_to_weightError }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-12">
            <label for="">{{ $t("choose_type_questionnaire") }} </label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="type_form"
                    id="type-form-1"
                    value="national"
                  />
                  <label for="type-form-1">{{
                    $t("national_questionnaire")
                  }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="type_form"
                    id="type-form-2"
                    value="international"
                  />
                  <label for="type-form-2">{{
                    $t("international_questionnaire")
                  }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="type_form"
                    id="type-form-3"
                    value="universal"
                    checked
                  />
                  <label for="type-form-3">{{
                    $t("universal_questionnaire")
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_save">
        <button class="link_blue" type="submit">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp; {{ $t("save") }}
        </button>
      </div>
    </form>
    <form @submit.prevent="submitFriends" id="friend-form">
      <h2>{{ $t("how_heard_us") }}?</h2>
      <div class="row">
        <div class="col-lg-10">
          <div class="form-group">
            <textarea name="from_source" :placeholder="$t('fill')"></textarea>
          </div>
        </div>
      </div>
      <div class="share_friend">
        <h3>{{ $t("share_happiness") }}</h3>
        <p>{{ $t("tag_friend") }}</p>
        <div class="row" v-for="item in 5" :key="item">
          <div class="col-lg-4 col-6">
            <div class="form-group">
              <label for="">{{ $t("friend") }} {{ item }}</label>
              <input
                type="text"
                :placeholder="$t('fill')"
                v-model="friends[item - 1]"
              />
            </div>
          </div>
          <div class="col-lg-4 col-6">
            <div class="form-group">
              <label for="">{{ $t("number") }}</label>
              <input
                type="tel"
                :placeholder="$t('fill')"
                v-model="phones[item - 1]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="anc_link_bottom">
        <button type="submit" class="link_blue">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-white"
          ></span>
          &nbsp; {{ $t("next") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  layout: "questionnaire",
  mounted() {
    this.setQuestionnairePercent(60);
  },
  data() {
    return {
      loading: false,
      country_id: null,
      region_id: null,
      friends: [],
      phones: [],
      from_ageError: "",
      up_to_ageError: "",
      countryError: "",
      regionError: "",
      from_heightError: "",
      up_to_heightError: "",
      from_weightError: "",
      up_to_weightError: "",
    };
  },
  computed: { ...mapGetters(["getReligions", "getCountries", "getRegions"]) },
  created() {
    this.fetchCountries();
    this.fetchReligions();
  },
  methods: {
    ...mapMutations({
      setQuestionnairePercent: "questionnaire/setQuestionnairePercent",
    }),
    ...mapActions({
      fetchReligions: "fetchReligions",
      fetchCountries: "fetchCountries",
      fetchRegions: "fetchRegions",
      saveFilterData: "questionnaire/saveFilterData",
      saveFriendsData: "questionnaire/saveFriendsData",
    }),
    selectCountry(value) {
      this.fetchRegions(value);
      this.country_id = value;
      this.countryError = "";
    },
    selectRegion(value) {
      this.region_id = value;
      this.regionError = "";
    },
    async submitForm(e) {
      if (this.validate(e)) {
        this.loading = true;
        const formData = new FormData(e.target);
        let form = Object.fromEntries(formData);
        form.country_id = this.country_id;
        form.region_id = this.region_id;
        try {
          await this.saveFilterData(form);
          this.loading = false;
          document.getElementById("friend-form").scrollIntoView();
        } catch (e) {
          alert(e);
        }
      }
    },
    validate(e) {
      let result = true;
      if (e.target.up_to_weight.value == "") {
        this.up_to_weightError = this.$t("Required field");
        document.getElementById("weight-label").scrollIntoView();
        result = false;
      }
      if (e.target.from_weight.value == "") {
        this.from_weightError = this.$t("Required field");
        document.getElementById("weight-label").scrollIntoView();
        result = false;
      }
      if (e.target.up_to_height.value == "") {
        this.up_to_heightError = this.$t("Required field");
        document.getElementById("height-label").scrollIntoView();
        result = false;
      }
      if (e.target.from_height.value == "") {
        this.from_heightError = this.$t("Required field");
        document.getElementById("height-label").scrollIntoView();
        result = false;
      }
      if (this.region_id == null) {
        this.regionError = this.$t("Required field");
        document.getElementById("region-label").scrollIntoView();
        result = false;
      }
      if (this.country_id == null) {
        this.countryError = this.$t("Required field");
        document.getElementById("country-label").scrollIntoView();
        result = false;
      }
      if (e.target.up_to_age.value == "") {
        this.up_to_ageError = this.$t("Required field");
        document.getElementById("age-label").scrollIntoView();
        result = false;
      }
      if (e.target.from_age.value == "") {
        this.from_ageError = this.$t("Required field");
        document.getElementById("age-label").scrollIntoView();
        result = false;
      }
      return result;
    },
    async submitFriends(e) {
      this.loading = true;
      const formData = new FormData(e.target);
      let form = Object.fromEntries(formData);
      form.friends = this.friends;
      form.phones = this.phones;
      try {
        await this.saveFriendsData(form);
        this.loading = false;
        this.$router.push(this.localePath("/questionnaire/seventh-part"));
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
