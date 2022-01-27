<template>
  <div class="anceta_form" v-if="!pageLoading">
    <form @submit.prevent="submitForm">
      <input type="hidden" name="update" :value="true" />
      <div class="row">
        <div class="col-lg-4">
          <div class="form-group">
            <label for>{{ $t("age") }} ( от ) ( до)</label>
            <div class="row">
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="from_age"
                  v-model="defaultForm.from_age"
                  min="18"
                  max="100"
                />
              </div>
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="up_to_age"
                  v-model="defaultForm.up_to_age"
                  min="18"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="country">{{ $t("country_residence") }}</label>
            <a-select
              id="country"
              :showSearch="false"
              :default-value="defaultForm.country_id"
              @change="selectCountry"
              :placeholder="$t('choose')"
              class="form-control"
              name="country_id"
            >
              <a-select-option
                v-for="country in getCountries"
                :key="country.key"
                :value="country.id"
              >{{ country.name }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for="#">{{ $t("city_residence") }}</label>
            <a-select
              :showSearch="false"
              :placeholder="$t('choose')"
              @change="selectRegion"
              :default-value="defaultForm.region_id"
              class="form-control"
            >
              <a-select-option
                v-for="item in getRegions"
                :key="item.id"
                :value="item.id"
              >{{ item.name }}</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-10">
            <label for>{{ $t("religion") }}</label>
            <div class="row">
              <div class="col-6" v-for="item in getReligions" :key="item.id">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="religion_id"
                    :value="item.id"
                    :checked="item.id == defaultForm.religion_id"
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
                    :checked="null == defaultForm.religion_id"
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
            <label for>{{ $t("family_status") }}</label>
            <div class="row">
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    id="family-status-1"
                    name="family_status"
                    value="single"
                    :checked="
                      defaultForm.family_status == 'single'
                    "
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
                    :checked="
                      defaultForm.family_status == 'divorced'
                    "
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
                    :checked="defaultForm.family_status == 'widow'"
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
                    :checked="-1 == defaultForm.family_status"
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
            <label for>{{ $t("relation_smoking") }}</label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="smoking"
                    id="smoking-1"
                    value="2"
                    :checked="'2' == defaultForm.smoking"
                  />
                  <label for="smoking-1">{{ $t("strongly_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="smoking"
                    id="smoking-2"
                    value="2"
                    :checked="'2' == defaultForm.smoking"
                  />
                  <label for="smoking-2">{{ $t("not_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="smoking"
                    id="smoking-3"
                    value="3"
                    :checked="'3' == defaultForm.smoking"
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
            <label for>{{ $t("relation_alcohol") }}</label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="alcohol"
                    id="alcohol-1"
                    value="1"
                    :checked="'1' == defaultForm.alcohol"
                  />
                  <label for="alcohol-1">{{ $t("strongly_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="alcohol"
                    id="alcohol-2"
                    value="2"
                    :checked="'2' == defaultForm.alcohol"
                  />
                  <label for="alcohol-2">{{ $t("not_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="alcohol"
                    id="alcohol-3"
                    :checked="'3' == defaultForm.alcohol"
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
            <label for>{{ $t("relation_drugs") }}</label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="drugs"
                    id="drug-1"
                    value="1"
                    :checked="'1' == defaultForm.drugs"
                  />
                  <label for="drug-1">{{ $t("strongly_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="drugs"
                    id="drug-2"
                    value="2"
                    :checked="'2' == defaultForm.drugs"
                  />
                  <label for="drug-2">{{ $t("not_against") }}</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="drugs"
                    id="drug-3"
                    value="3"
                    :checked="'3' == defaultForm.drugs"
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
            <label for>{{ $t("financial_status") }}</label>
            <div class="row">
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="financial_status"
                    id="financial-status-1"
                    value="high"
                    :checked="
                      'high' == defaultForm.financial_status
                    "
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
                    :checked="
                      'middle' == defaultForm.financial_status
                    "
                  />
                  <label for="financial-status-3">{{ $t("middle_income") }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="financial_status"
                    id="financial-status-4"
                    value="low"
                    :checked="
                      'low' == defaultForm.financial_status
                    "
                  />
                  <label for="financial-status-4">
                    {{
                      $t("little_income")
                    }}
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="financial_status"
                    id="financial-status-2"
                    value="-1"
                    :checked="-1 == defaultForm.financial_status"
                  />
                  <label for="financial-status-2">
                    {{
                      $t("doesnt_matter")
                    }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for>{{ $t("height") }} ( от ) ( до)</label>
            <div class="row">
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="from_height"
                  v-model="defaultForm.from_height"
                  min="100"
                  max="250"
                />
              </div>
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="up_to_height"
                  v-model="defaultForm.up_to_height"
                  min="100"
                  max="250"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for>{{ $t("weight") }} ( от ) ( до)</label>
            <div class="row">
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="from_weight"
                  v-model="defaultForm.from_weight"
                  min="30"
                  max="150"
                />
              </div>
              <div class="col-6">
                <input
                  type="number"
                  :placeholder="$t('fill')"
                  name="up_to_weight"
                  v-model="defaultForm.up_to_weight"
                  min="30"
                  max="150"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f_education">
        <div class="row">
          <div class="col-lg-12">
            <label for>{{ $t("choose_type_questionnaire") }}</label>
            <div class="row">
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="type_form"
                    id="type-form-1"
                    value="national"
                    :checked="'national' == defaultForm.type_form"
                  />
                  <label for="type-form-1">
                    {{
                      $t("national_questionnaire")
                    }}
                  </label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="type_form"
                    id="type-form-2"
                    value="international"
                    :checked="
                      'international' == defaultForm.type_form
                    "
                  />
                  <label for="type-form-2">
                    {{
                      $t("international_questionnaire")
                    }}
                  </label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group radio_button">
                  <input
                    type="radio"
                    name="type_form"
                    id="type-form-3"
                    value="universal"
                    :checked="'universal' == defaultForm.type_form"
                  />
                  <label for="type-form-3">
                    {{
                      $t("universal_questionnaire")
                    }}
                  </label>
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { isEmpty } from "lodash";

export default {
  data() {
    return {
      pageLoading: true,
      loading: false,
      country_id: null,
      region_id: null,
      defaultForm: {}
    };
  },
  computed: {
    ...mapGetters([
      "getReligions",
      "getCountries",
      "getRegions",
    ]),
  },
  async created() {
    await this.fetchMainFilterDefaultForm();
  },
  async mounted() {
    this.defaultForm = { ...this.$store.getters.getMainFilterDefaultForm }

    this.country_id = this.defaultForm.country_id;
    if (this.country_id) {
      this.fetchRegions(this.country_id)
    }

    this.region_id = this.defaultForm.region_id;
    this.pageLoading = false;
  },
  methods: {
    ...mapMutations(["questionnaireModule/setQuestionnairePercent"]),
    ...mapActions([
      "fetchReligions",
      "fetchCountries",
      "fetchRegions",
      "fetchMainFilterDefaultForm",
    ]),
    selectCountry(value) {
      this.fetchRegions(value);
      this.country_id = value;
    },
    selectRegion(value) {
      this.region_id = value;
    },
    async submitForm(e) {
      this.loading = true;
      const formData = new FormData(e.target);
      let form = Object.fromEntries(formData);
      form.country_id = this.country_id;
      form.region_id = this.region_id;

      try {
        await this.$store.dispatch("questionnaireModule/saveFilterData", form);
        this.loading = false;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.$toast.error("Error while saving data: ", message);
      }

      this.$bvModal.show("setting-modal")
    },
  },
};
</script>
