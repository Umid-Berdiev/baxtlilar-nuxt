<template>
  <form
    v-if="pageReady"
    @submit.prevent="submit"
    class="anceta_form"
    enctype="multipart/form-data"
  >
    <input type="hidden" name="update" :value="true" />
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("parents") }} </label>
          <a-select
            label-in-value
            :placeholde="$t('choose')"
            :showSearch="false"
            @change="selectParents"
            class="form-control"
            :default-value="{ key: parents }"
          >
            <a-select-option :value="2">{{
              $t("mom_and_dad")
            }}</a-select-option>
            <a-select-option :value="1">{{ $t("dad") }}</a-select-option>
            <a-select-option :value="0">{{ $t("mom") }}</a-select-option>
            <a-select-option :value="-1">{{ $t("orphan") }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-sm-4 col-6">
        <div class="form-group">
          <label for="">{{ $t("count_brothers") }}</label>
          <a-select
            :showSearch="false"
            name="brothersCount"
            @change="selectBrothersCount"
            :default-value="getBrothersCount"
            class="form-control"
          >
            <a-select-option v-for="item in 11" :key="item" :value="item - 1">
              {{ item - 1 }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col-sm-4 col-6">
        <div class="form-group">
          <label for="">{{ $t("count_sisters") }}</label>
          <!-- <input type="number" v-model="sistersCount" /> -->
          <a-select
            :showSearch="false"
            name="sistersCount"
            @change="selectSistersCount"
            :default-value="getSistersCount"
            class="form-control"
          >
            <a-select-option v-for="item in 11" :key="item" :value="item - 1">
              {{ item - 1 }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="row" v-if="parents == 2 || parents == 0">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("mom") }}</label>
          <input
            type="text"
            :placeholder="$t('fill')"
            name="motherName"
            v-model="relatives.mother.fio"
          />
        </div>
      </div>
      <div class="col-sm-2 col-6">
        <div class="form-group">
          <label for="">{{ $t("age") }}</label>
          <input
            type="number"
            :placeholder="$t('fill')"
            name="motherAge"
            v-model="relatives.mother.age"
            v-maska="'###'"
          />
        </div>
      </div>
      <div class="col-sm-4 col-6">
        <div class="form-group">
          <label for="">{{ $t("employment") }}</label>
          <input
            type="text"
            :placeholder="$t('fill')"
            name="motherSpeciality"
            v-model="relatives.mother.profession"
          />
        </div>
      </div>
    </div>
    <div class="row" v-if="parents == 2 || parents == 1">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("dad") }}</label>
          <input
            type="text"
            :placeholder="$t('fill')"
            name="fatherName"
            v-model="relatives.father.fio"
          />
        </div>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label for="">{{ $t("age") }}</label>
          <input
            type="number"
            :placeholder="$t('fill')"
            name="fatherAge"
            v-model="relatives.father.age"
            v-maska="'###'"
          />
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("employment") }}</label>
          <input
            type="text"
            :placeholder="$t('fill')"
            name="fatherSpeciality"
            v-model="relatives.father.profession"
          />
        </div>
      </div>
    </div>
    <div class="row" v-for="index in getBrothersCount" :key="index">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ index }} - {{ $t("brother") }} </label>
          <input
            type="text"
            :placeholder="$t('fill')"
            v-model="brothersName[index - 1]"
          />
        </div>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label for="">{{ $t("age") }}</label>
          <input
            type="number"
            :placeholder="$t('fill')"
            v-model="brothersAge[index - 1]"
            v-maska="'##'"
          />
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("employment") }}</label>
          <input
            type="text"
            :placeholder="$t('fill') + '.....'"
            v-model="brothersSpeciality[index - 1]"
          />
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("family_status") }} </label>
          <input
            type="text"
            :placeholder="$t('fill') + '.....'"
            v-model="brothersFamily[index - 1]"
          />
        </div>
      </div>
    </div>
    <div class="row" v-for="index in getSistersCount" :key="index">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ index }} - {{ $t("sister") }} </label>
          <input
            required
            type="text"
            :placeholder="$t('fill')"
            v-model="sistersName[index - 1]"
          />
        </div>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label for="">{{ $t("age") }}</label>
          <input
            required
            type="number"
            :placeholder="$t('fill')"
            v-model="sistersAge[index - 1]"
            v-maska="'##'"
          />
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("employment") }}</label>
          <input
            required
            type="text"
            :placeholder="$t('fill')"
            v-model="sistersSpeciality[index - 1]"
          />
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="">{{ $t("family_status") }} </label>
          <input
            required
            type="text"
            :placeholder="$t('fill')"
            v-model="sistersFamily[index - 1]"
          />
        </div>
      </div>
    </div>
    <h2>{{ $t("questionnaire_photo_text") }}</h2>
    <upload-image :fileList="images" :type="'family'" />

    <br />
    <div class="is_photo_visible">
      <div class="radio_button allget">
        <input name="image_status" value="1" type="checkbox" id="ada2" />
        <label for="ada2">{{ $t("blur_photos") }}</label>
      </div>
      <p>
        {{ $t("blur_photos_text") }}
      </p>
    </div>
    <div class="anc_link_bottom">
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
import { mapActions, mapMutations } from "vuex";
import UploadImage from "@/components/UploadImage.vue";
import _ from "lodash";
// import { Modal } from 'bootstrap'

export default {
  async created() {
    this.relatives = await this.fetchRelativesForSetting();
    if (_.isEmpty(this.relatives.mother)) {
      this.relatives.mother = {};
    }
    if (_.isEmpty(this.relatives.father)) {
      this.relatives.father = {};
    }
    this.parents = this.relatives.parents;
    this.brothersCount = this.relatives.brothersName.length;
    this.brothersName = this.relatives.brothersName;
    this.brothersAge = this.relatives.brothersAge;
    this.brothersSpeciality = this.relatives.brothersSpeciality;
    this.brothersFamily = this.relatives.brothersFamily;
    this.sistersCount = this.relatives.sistersName.length;
    this.sistersName = this.relatives.sistersName;
    this.sistersAge = this.relatives.sistersAge;
    this.sistersSpeciality = this.relatives.sistersSpeciality;
    this.sistersFamily = this.relatives.sistersFamily;

    this.pageReady = true;
  },
  components: { UploadImage },
  data() {
    return {
      loading: false,
      pageReady: false,
      parents: null,
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
      relatives: {},
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
    ...mapActions(["saveUserFamilyData", "fetchRelativesForSetting"]),
    ...mapMutations(["setQuestionnairePercent"]),
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
      if (!form.image_status) {
        form.image_status = 0;
      }
      form.images = this.images.map((image) => image.thumbUrl);
      try {
        await this.saveUserFamilyData(form);
        this.loading = false;
      } catch (e) {
        alert(e);
      }

      const modal = this.$Modal.getInstance(
        document.getElementById("setting-modal")
      );
      modal.show();
    },
    selectParents(value) {
      this.parents = value.value;
    },
    selectBrothersCount(value) {
      this.brothersCount = value;
    },
    selectSistersCount(value) {
      this.sistersCount = value;
    },
  },
};
</script>
