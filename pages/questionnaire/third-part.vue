<template>
  <div class="anceta_form">
    <div class="steps_form">
      <div class="active">{{ $t("fill_data") }}</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-lg-5">
          <div class="form-group">
            <label for="#" id="family_status-label">
              {{
                $t("family_status")
              }}
            </label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              class="form-control"
              @change="selectFamilyStatus"
              name="family_status"
            >
              <a-select-option value="single">
                {{
                  $t("single")
                }}
              </a-select-option>
              <a-select-option value="relationship">
                {{
                  $t("in_relationship")
                }}
              </a-select-option>
              <a-select-option value="divorced">
                {{
                  $t("divorced")
                }}
              </a-select-option>
              <a-select-option value="widow">{{ $t("widow") }}</a-select-option>
            </a-select>
            <span class="text-danger">{{ family_statusError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5 col-sm-6 col-8">
          <div class="form-group">
            <label for>{{ $t("having_children") }}</label>
            <div class="row big_radio">
              <div class="col-6">
                <input
                  type="radio"
                  name="child"
                  id="child1"
                  value="1"
                  @change="children"
                />
                <label for="child1">Да</label>
              </div>
              <div class="col-6">
                <input
                  type="radio"
                  name="child"
                  id="child2"
                  checked
                  value="0"
                  @change="children"
                />
                <label for="child2">{{ $t("no") }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-sm-6 col-4">
          <div class="form-group" v-if="hasChildren">
            <label>{{ $t("count_chilldren") }}</label>
            <a-select
              :showSearch="false"
              name="childrenCount"
              @change="selectChildrenCount"
              :default-value="1"
              class="form-control"
            >
              <a-select-option
                v-for="item in 10"
                :key="item"
                :value="item"
              >{{ item }}</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="row" v-for="index in parseInt(childrenCount)" :key="index">
        <div class="col-lg-3 col-sm-6">
          <div class="form-group">
            <label for>{{ $t("sex") }}</label>
            <a-select
              :placeholder="$t('choose')"
              :showSearch="false"
              @change="(value) => selectChildGender(value, index - 1)"
              class="form-control"
            >
              <a-select-option value="son">{{ $t("boy") }}</a-select-option>
              <a-select-option value="daughter">
                {{
                  $t("girl")
                }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="form-group">
            <label for>{{ $t("age") }}</label>
            <input
              type="number"
              :placeholder="$t('fill')"
              v-model="selects.childAge[index - 1]"
              min="0"
              max="99"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="form-group">
            <label for id="health-label">{{ $t("health_text") }}?</label>
            <textarea
              name="health"
              id
              :placeholder="$t('fill')"
              @input="healthError = ''"
            ></textarea>
            <span class="text-danger">{{ healthError }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5">
          <div class="form-group">
            <label for>{{ $t("have_criminal") }}</label>
            <div class="row big_radio">
              <div class="col-lg-4 col-sm-4 col-6">
                <input
                  type="radio"
                  name="mf"
                  id="mf1"
                  value="1"
                  @change="crime"
                />
                <label for="mf1">Да</label>
              </div>
              <div class="col-lg-4 col-sm-4 col-6">
                <input
                  type="radio"
                  id="mf2"
                  name="mf"
                  value="0"
                  checked
                  @change="crime"
                />
                <label for="mf2">{{ $t("no") }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="form-group" v-if="hasCrime">
            <label for>{{ $t("which_criminal") }}?</label>
            <input type="text" name="criminal_article" v-model="crimeArticle" />
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
import { mapActions, mapMutations } from "vuex";

export default {
  layout: "questionnaire",
  mounted() {
    this.setQuestionnairePercent(15);
  },
  data() {
    return {
      loading: false,
      hasChildren: false,
      childrenCount: 0,
      hasCrime: false,
      crimeArticle: null,
      selects: {
        family_status: null,
        childGender: [],
        childAge: [],
      },
      family_statusError: "",
      healthError: "",
    };
  },
  methods: {
    ...mapActions({
      saveUserFamilyStatus: "questionnaireModule/saveUserFamilyStatus",
    }),
    ...mapMutations({
      setQuestionnairePercent: "questionnaireModule/setQuestionnairePercent",
    }),
    children(e) {
      if (e.target.value == 1) {
        this.hasChildren = true;
        this.childrenCount = 1;
      } else {
        this.hasChildren = false;
        this.childrenCount = 0;
      }
    },
    crime(e) {
      if (e.target.value == 1) {
        this.hasCrime = true;
      } else {
        this.hasCrime = false;
        this.crimeArticle = null;
      }
    },
    async submit(e) {
      if (this.validate(e)) {
        this.loading = true;
        const formData = new FormData(e.target);
        let form = Object.fromEntries(formData);
        form = { ...form, ...this.selects };
        console.log(form);
        try {
          await this.saveUserFamilyStatus(form);
          this.loading = false;
          this.$router.push(this.localePath("/questionnaire/fourth-part"));
        } catch (e) {
          alert(e);
          // this.$router.push({ path: "/fourth-part" });
        }
      }
    },
    validate(e) {
      let result = true;
      if (e.target.health.value == "") {
        this.healthError = this.$t("Required field");
        document.getElementById("health-label").scrollIntoView();
        result = false;
      }
      if (this.selects.family_status == null) {
        this.family_statusError = this.$t("Required field");
        document.getElementById("family_status-label").scrollIntoView();
        result = false;
      }
      return result;
    },
    selectChildGender(value, index) {
      this.selects.childGender[index] = value;
    },
    selectFamilyStatus(value) {
      this.family_statusError = "";
      this.selects.family_status = value;
    },
    selectChildrenCount(value) {
      this.childrenCount = value;
    },
  },
};
</script>

<style></style>
