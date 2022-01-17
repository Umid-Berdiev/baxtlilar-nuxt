<template>
  <div class="anceta_form">
    <div class="steps_form">
      <div class="active">{{ $t("fill_data") }}</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
    <h2 id="education-label">{{ $t("education") }}</h2>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              class="form-control"
              @change="selectEducation"
              name="education"
            >
              <a-select-option :value="$t('average')">
                {{
                  $t("average")
                }}
              </a-select-option>
              <a-select-option :value="$t('unfinished_higher')">
                {{
                  $t("unfinished_higher")
                }}
              </a-select-option>
              <a-select-option :value="$t('higher')">
                {{
                  $t("higher")
                }}
              </a-select-option>
              <a-select-option :value="$t('academic_degree')">
                {{
                  $t("academic_degree")
                }}
              </a-select-option>
            </a-select>
            <span class="text-danger">{{ educationError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for id="specialty-label">{{ $t("profession") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              name="specialty"
              @input="specialtyError = ''"
            />
            <span class="text-danger">{{ specialtyError }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for id="employment-label">{{ $t("employment") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              name="employment"
              @input="employmentError = ''"
            />
            <span class="text-danger">{{ employmentError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10">
          <div class="form-group">
            <label for id="hobby-label">{{ $t("hobby") }}</label>
            <textarea
              name="hobby"
              id
              :placeholder="$t('fill') + '....'"
              @input="hobbyError = ''"
            ></textarea>
            <span class="text-danger">{{ hobbyError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for id="smoking-label">
              {{
                $t("relation_smoking")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              class="form-control"
              @change="selectSmoking"
              name="smoking"
            >
              <a-select-option value="1">{{ $t("smoking_1") }}</a-select-option>
              <a-select-option value="2">{{ $t("smoking_2") }}</a-select-option>
              <a-select-option value="3">{{ $t("smoking_3") }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ smokingError }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for id="alcohol-label">
              {{
                $t("relation_alcohol")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              class="form-control"
              @change="selectAlcohol"
              name="alcohol"
            >
              <a-select-option value="1">{{ $t("smoking_1") }}</a-select-option>
              <a-select-option value="2">{{ $t("drugs_2") }}</a-select-option>
              <a-select-option value="3">{{ $t("drugs_3") }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ alcoholError }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <div class="form-group">
            <label for id="drugs-label">{{ $t("relation_drugs") }}</label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              class="form-control"
              @change="selectDrugs"
              name="drugs"
            >
              <a-select-option value="1">
                {{
                  $t("smoking_1")
                }}
              </a-select-option>
              <a-select-option value="2">{{ $t("drugs_2") }}</a-select-option>
              <a-select-option value="3">{{ $t("drugs_3") }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ drugsError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-4 col-6">
          <div class="form-group">
            <label for id="financial_status-label">
              {{
                $t("financial_status")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              class="form-control"
              @change="selectFinancialStatus"
              name="financial_status"
            >
              <a-select-option value="1">{{ $t("wealthy") }}</a-select-option>
              <a-select-option value="2">
                {{
                  $t("middle_income")
                }}
              </a-select-option>
              <a-select-option value="3">{{ $t("no_income") }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ financial_statusError }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-4 col-6">
          <div class="form-group">
            <label for id="living_space-label">
              {{
                $t("living_space")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              class="form-control"
              @change="selectLivingSpace"
              name="living_space"
            >
              <a-select-option value="1">{{ $t("own_home") }}</a-select-option>
              <a-select-option value="2">
                {{
                  $t("rent_apartment")
                }}
              </a-select-option>
              <a-select-option value="3">
                {{
                  $t("live_with_parents")
                }}
              </a-select-option>
            </a-select>
            <span class="text-danger">{{ living_spaceError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10">
          <div class="form-group">
            <label for>{{ $t("ready_live_together") }}?</label>
            <div class="row big_radio">
              <div class="col-lg-2 col-sm-4 col-6">
                <input
                  type="radio"
                  name="ready_live_in_space"
                  id="jil1"
                  value="1"
                />
                <label for="jil1">{{ $t("yes") }}</label>
              </div>
              <div class="col-lg-2 col-sm-4 col-6">
                <input
                  type="radio"
                  name="ready_live_in_space"
                  id="jil2"
                  value="0"
                  checked
                />
                <label for="jil2">{{ $t("no") }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="new_add_l">
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
export default {
  layout: "questionnaire",
  data() {
    return {
      loading: false,
      selects: {
        education: null,
        smoking: null,
        alcohol: null,
        financial_status: null,
        living_space: null,
      },
      educationError: "",
      specialtyError: "",
      employmentError: "",
      hobbyError: "",
      smokingError: "",
      alcoholError: "",
      drugsError: "",
      financial_statusError: "",
      living_spaceError: "",
    };
  },
  computed: {
    currentUser() {
      return this.$auth.user;
    },
  },
  mounted() {
    this.$store.commit("questionnaireModule/setQuestionnairePercent", 10);
  },
  methods: {
    async submit(e) {
      if (this.validate(e)) {
        this.loading = true;
        const formData = new FormData(e.target);
        let form = Object.fromEntries(formData);
        form = { ...form, ...this.selects };
        try {
          await this.$store.dispatch("questionnaireModule/saveUserEducaton", form);
          this.loading = false;
          this.$router.push(this.localePath("/questionnaire/third-part"));
        } catch (e) {
          alert(e);
        }
      }
    },
    validate(e) {
      let result = true;
      if (this.selects.living_space == null) {
        this.living_spaceError = this.$t("Required field");
        document.getElementById("living_space-label").scrollIntoView();
        result = false;
      }
      if (this.selects.financial_status == null) {
        this.financial_statusError = this.$t("Required field");
        document.getElementById("financial_status-label").scrollIntoView();
        result = false;
      }
      if (this.selects.drugs == null) {
        this.drugsError = this.$t("Required field");
        document.getElementById("drugs-label").scrollIntoView();
        result = false;
      }
      if (this.selects.alcohol == null) {
        this.alcoholError = this.$t("Required field");
        document.getElementById("alcohol-label").scrollIntoView();
        result = false;
      }
      if (this.selects.smoking == null) {
        this.smokingError = this.$t("Required field");
        document.getElementById("smoking-label").scrollIntoView();
        result = false;
      }
      if (e.target.hobby.value == "") {
        this.hobbyError = this.$t("Required field");
        document.getElementById("hobby-label").scrollIntoView();
        result = false;
      }

      if (e.target.employment.value == "") {
        this.employmentError = this.$t("Required field");
        document.getElementById("employment-label").scrollIntoView();
        result = false;
      }
      if (e.target.specialty.value == "") {
        this.specialtyError = this.$t("Required field");
        document.getElementById("specialty-label").scrollIntoView();
        result = false;
      }
      if (this.selects.education == null) {
        this.educationError = this.$t("Required field");
        document.getElementById("education-label").scrollIntoView();
        result = false;
      }
      return result;
    },
    selectEducation(value) {
      this.educationError = "";
      this.selects.education = value;
    },
    selectSmoking(value) {
      this.smokingError = "";
      this.selects.smoking = value;
    },
    selectAlcohol(value) {
      this.alcoholError = "";
      this.selects.alcohol = value;
    },
    selectDrugs(value) {
      this.drugsError = "";
      this.selects.drugs = value;
    },
    selectFinancialStatus(value) {
      this.financial_statusError = "";
      this.selects.financial_status = value;
    },
    selectLivingSpace(value) {
      this.living_spaceError = "";
      this.selects.living_space = value;
    },
  },
};
</script>
