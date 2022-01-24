<template>
  <form @submit.prevent="submit" class="anceta_form">
    <input type="hidden" name="update" :value="true" />
    <h2>{{ $t("education") }}</h2>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            class="form-control"
            @change="selectEducation"
            :value="user.education"
            name="education"
          >
            <a-select-option value="average">
              {{
                $t("average")
              }}
            </a-select-option>
            <a-select-option value="unfinished_higher">
              {{
                $t("unfinished_higher")
              }}
            </a-select-option>
            <a-select-option value="higher">{{ $t("higher") }}</a-select-option>
            <a-select-option value="academic_degree">
              {{
                $t("academic_degree")
              }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for>{{ $t("profession") }}</label>
          <input
            type="text"
            :placeholder="$t('fill')"
            name="specialty"
            v-model="user.specialty"
          />
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for>{{ $t("employment") }}</label>
          <input
            type="text"
            :placeholder="$t('fill')"
            v-model="user.employment"
            name="employment"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-10">
        <div class="form-group">
          <label for>{{ $t("hobby") }}</label>
          <textarea
            name="hobby"
            id
            :placeholder="$t('fill') + '....'"
            v-model="user.hobby"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for>{{ $t("relation_smoking") }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            class="form-control"
            :value="user.smoking"
            @change="selectSmoking"
            name="smoking"
          >
            <a-select-option :value="1">{{ $t("smoking_1") }}</a-select-option>
            <a-select-option :value="2">{{ $t("smoking_2") }}</a-select-option>
            <a-select-option :value="3">{{ $t("smoking_3") }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for>{{ $t("relation_alcohol") }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            class="form-control"
            @change="selectAlcohol"
            :value="user.alcohol"
            name="alcohol"
          >
            <a-select-option :value="1">{{ $t("smoking_1") }}</a-select-option>
            <a-select-option :value="2">{{ $t("drugs_2") }}</a-select-option>
            <a-select-option :value="3">{{ $t("drugs_3") }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="form-group">
          <label for>{{ $t("relation_drugs") }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            class="form-control"
            @change="selectDrugs"
            name="drugs"
            :value="user.drugs"
          >
            <a-select-option :value="1">{{ $t("smoking_1") }}</a-select-option>
            <a-select-option :value="2">{{ $t("drugs_2") }}</a-select-option>
            <a-select-option :value="3">{{ $t("drugs_3") }}</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-sm-4 col-6">
        <div class="form-group">
          <label for>{{ $t("financial_status") }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            class="form-control"
            @change="selectFinancialStatus"
            name="financial_status"
            :value="user.financial_status"
          >
            <a-select-option value="1">{{ $t("wealthy") }}</a-select-option>
            <a-select-option value="2">
              {{
                $t("middle_income")
              }}
            </a-select-option>
            <a-select-option value="3">{{ $t("no_income") }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-lg-4 col-sm-4 col-6">
        <div class="form-group">
          <label for>{{ $t("living_space") }}</label>
          <a-select
            :placeholder="$t('choose')"
            :showSearch="false"
            class="form-control"
            @change="selectLivingSpace"
            name="living_space"
            :value="user.living_space"
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
                :checked="user.ready_live_in_space == 1"
                :value="1"
              />
              <label for="jil1">{{ $t("yes") }}</label>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <input
                type="radio"
                name="ready_live_in_space"
                id="jil2"
                :value="0"
                :checked="user.ready_live_in_space == 0"
              />
              <label for="jil2">{{ $t("no") }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="new_add_l">
      <!-- <button type="submit" class="link_blue red">Coxpaнить</button> -->
      <button type="submit" class="link_blue">
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm text-white"
        ></span>
        &nbsp; {{ $t("save") }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: { user: Object },
  async mounted() {
    if (this.user) {
      this.selects = {
        education: this.user.education,
        smoking: this.user.smoking,
        alcohol: this.user.alcohol,
        drugs: this.user.drugs,
        financial_status: this.user.financial_status,
        living_space: this.user.living_space,
      };
    }
  },
  data() {
    return {
      loading: false,
      selects: {},
    };
  },
  methods: {
    ...mapMutations(["questionnaireModule/setQuestionnairePercent"]),
    async submit(e) {
      this.loading = true;
      const formData = new FormData(e.target);
      let form = Object.fromEntries(formData);

      form = { ...form, ...this.selects };

      try {
        await this.$store.dispatch("saveUserEducaton", form);
        this.$bvModal.show("setting-modal")
      } catch (e) {
        alert(e);
      }

      this.loading = false;
    },
    selectEducation(value) {
      this.selects.education = value;
    },
    selectSmoking(value) {
      this.selects.smoking = value;
    },
    selectAlcohol(value) {
      this.selects.alcohol = value;
    },
    selectDrugs(value) {
      this.selects.drugs = value;
    },
    selectFinancialStatus(value) {
      this.selects.financial_status = value;
    },
    selectLivingSpace(value) {
      this.selects.living_space = value;
    },
  },
};
</script>

<style></style>
