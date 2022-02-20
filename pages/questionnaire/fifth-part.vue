<template>
  <div class="anceta_form">
    <div class="steps_form">
      <div>1</div>
      <div>2</div>
      <div class="active">{{ $t("family_data") }}</div>
      <div>4</div>
      <div>5</div>
    </div>
    <h2>{{ $t("fill_family_data") }}</h2>
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("parents") }}</label>
            <a-select
              label-in-value
              :placeholde="$t('type_name')"
              :showSearch="false"
              @change="selectParents"
              class="form-control"
              name="parents"
              :default-value="{ key: '2' }"
            >
              <a-select-option value="2">
                {{
                  $t("mom_and_dad")
                }}
              </a-select-option>
              <a-select-option value="1">{{ $t("dad") }}</a-select-option>
              <a-select-option value="0">{{ $t("mom") }}</a-select-option>
              <a-select-option value="-1">{{ $t("orphan") }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="col-sm-4 col-6">
          <div class="form-group">
            <label for>{{ $t("count_brothers") }}</label>
            <a-select
              :showSearch="false"
              name="brothersCount"
              @change="selectBrothersCount"
              :default-value="1"
              class="form-control"
            >
              <a-select-option
                v-for="item in 11"
                :key="item"
                :value="item - 1"
              >{{ item - 1 }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="col-sm-4 col-6">
          <div class="form-group">
            <label for>{{ $t("count_sisters") }}</label>
            <a-select
              :showSearch="false"
              name="sistersCount"
              @change="selectSistersCount"
              :default-value="1"
              class="form-control"
            >
              <a-select-option
                v-for="item in 11"
                :key="item + '-2'"
                :value="item - 1"
              >{{ item - 1 }}</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="row" v-if="parents == 2 || parents == 0">
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("mom") }}</label>
            <input type="text" :placeholder="$t('fill_name')" name="motherName" />
          </div>
        </div>
        <div class="col-sm-2 col-6">
          <div class="form-group">
            <label for>{{ $t("age") }}</label>
            <input
              type="number"
              :placeholder="$t('fill')"
              name="motherAge"
              max="150"
            />
          </div>
        </div>
        <div class="col-sm-4 col-6">
          <div class="form-group">
            <label for>{{ $t("employment") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              name="motherSpeciality"
            />
          </div>
        </div>
      </div>
      <div class="row" v-if="parents == 2 || parents == 1">
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("dad") }}</label>
            <input type="text" :placeholder="$t('fill_name')" name="fatherName" />
          </div>
        </div>
        <div class="col-sm-2">
          <div class="form-group">
            <label for>{{ $t("age") }}</label>
            <input
              type="number"
              :placeholder="$t('fill')"
              name="fatherAge"
              max="150"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("employment") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              name="fatherSpeciality"
            />
          </div>
        </div>
      </div>
      <div class="row" v-for="index in getBrothersCount" :key="index + '-b'">
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ index }} - {{ $t("brother") }}</label>
            <input
              type="text"
              :placeholder="$t('fill_name')"
              v-model="brothersName[index - 1]"
            />
          </div>
        </div>
        <div class="col-sm-2">
          <div class="form-group">
            <label for>{{ $t("age") }}</label>
            <input
              type="number"
              :placeholder="$t('fill')"
              v-model="brothersAge[index - 1]"
              max="99"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("employment") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              v-model="brothersSpeciality[index - 1]"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("family_status") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              v-model="brothersFamily[index - 1]"
            />
          </div>
        </div>
      </div>
      <div class="row" v-for="index in getSistersCount" :key="index + '-g'">
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ index }} - {{ $t("sister") }}</label>
            <input
              type="text"
              :placeholder="$t('fill_name')"
              v-model="sistersName[index - 1]"
            />
          </div>
        </div>
        <div class="col-sm-2">
          <div class="form-group">
            <label for>{{ $t("age") }}</label>
            <input
              type="number"
              :placeholder="$t('fill')"
              v-model="sistersAge[index - 1]"
              max="99"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("employment") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              v-model="sistersSpeciality[index - 1]"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label for>{{ $t("family_status") }}</label>
            <input
              type="text"
              :placeholder="$t('fill')"
              v-model="sistersFamily[index - 1]"
            />
          </div>
        </div>
      </div>

      <h2>{{ $t("questionnaire_photo_text") }}</h2>
      <the-upload-image
        :fileList.sync="images"
        @update-list="updateImagesList"
      />
      <!-- <span class="text-danger">{{ imagesError }}</span> -->
      <br />
      <div class="is_photo_visible">
        <div class="radio_button allget">
          <input name="image_status" value="1" type="checkbox" id="ada1" />
          <label for="ada1">{{ $t("blur_photos") }}</label>
        </div>
        <p>{{ $t("blur_photo_less") }}</p>
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
import { mapActions, mapMutations } from "vuex";
import TheUploadImage from "~/components/TheUploadImage.vue";

export default {
  layout: "questionnaire",
  components: { TheUploadImage },
  mounted() {
    this.setQuestionnairePercent(40);
  },
  data() {
    return {
      loading: false,
      parents: 2,
      brothersCount: 1,
      sistersCount: 1,
      brothersName: [],
      brothersAge: [],
      brothersSpeciality: [],
      brothersFamily: [],
      sistersName: [],
      sistersAge: [],
      sistersSpeciality: [],
      sistersFamily: [],
      urls: [],
      images: [],
    };
  },
  computed: {
    getBrothersCount() {
      if (this.brothersCount) {
        return parseInt(this.brothersCount);
      } else {
        return 0;
      }
    },
    getSistersCount() {
      if (this.sistersCount) {
        return parseInt(this.sistersCount);
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions({ saveUserFamilyData: "questionnaireModule/saveUserFamilyData" }),
    ...mapMutations({
      setQuestionnairePercent: "questionnaireModule/setQuestionnairePercent",
    }),
    async submit(e) {
      this.loading = true;
      const formData = new FormData(e.target);
      let form = Object.fromEntries(formData);
      if (this.brothersCount > 0) {
        form.brothersName = this.brothersName;
        form.brothersAge = this.brothersAge;
        form.brothersSpeciality = this.brothersSpeciality;
        form.brothersFamily = this.brothersFamily;
      }
      if (this.sistersCount > 0) {
        form.sistersName = this.sistersName;
        form.sistersAge = this.sistersAge;
        form.sistersSpeciality = this.sistersSpeciality;
        form.sistersFamily = this.sistersFamily;
      }

      form.images = this.images.map((image) => image.thumbUrl);
      try {
        await this.saveUserFamilyData(form);
        this.loading = false;
        this.$router.push(this.localePath("/questionnaire/sixth-part"));
      } catch (e) {
        alert(e);
      }
    },
    selectParents(value) {
      this.parents = value.key;
    },
    selectBrothersCount(value) {
      this.brothersCount = value;
    },
    selectSistersCount(value) {
      this.sistersCount = value;
    },
    updateImagesList(arr) {
      this.images = arr;
    },
  },
};
</script>
