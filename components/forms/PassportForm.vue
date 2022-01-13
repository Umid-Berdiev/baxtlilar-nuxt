<template>
  <form
    @submit.prevent="submit"
    class="anceta_form"
    enctype="multipart/form-data"
  >
    <input type="hidden" name="update" :value="true" />
    <div class="row">
      <div class="col-lg-8">
        <div class="form-group">
          <label for>{{ $t("type_addres") }}</label>
          <input
            type="text"
            name="place_of_birth"
            v-model="user.place_of_birth"
          />
        </div>
      </div>
      <div class="col-lg-8">
        <div class="form-group">
          <label for>{{ $t("type_residence_address") }}</label>
          <input type="text" name="issued_by" v-model="user.place_of_residence" />
          <span class="text-danger">{{ issuedByError }}</span>
        </div>
      </div>
    </div>
    <div class="confirm_for">
      <h2>{{ $t("confirmation_personal_data") }}</h2>
      <div class="item_con">
        <img src="~/assets/images/con2.svg" alt />
        {{ $t("confirmation_personal_data_fewer_response") }}
      </div>
      <h3>{{ $t("attach_passwort_text") }}</h3>
    </div>
    <h3>{{ $t("passport_data") }}</h3>
    <div class="row">
      <div class="col-sm-2 col-3">
        <div class="form-group">
          <label for>{{ $t("serie") }}</label>
          <input
            type="text"
            style="text-transform: uppercase"
            placeholder="AB"
            name="series"
            v-model="user.series"
            @input="seriesError = ''"
          />
          <span class="text-danger">{{ seriesError }}</span>
        </div>
      </div>
      <div class="col-sm-4 col-3">
        <div class="form-group">
          <label for>{{ $t("number") }}</label>
          <input
            type="number"
            placeholder="1234567"
            name="number"
            v-model="user.number"
            @input="numberError = ''"
          />
          <span class="text-danger">{{ numberError }}</span>
        </div>
      </div>
      <div class="col-sm-4 col-6">
        <div class="form-group">
          <label for>{{ $t("when_given") }}</label>
          <a-date-picker
            :placeholder="$t('select_date')"
            format="YYYY-MM-DD"
            name="when_issued"
            id="when_issued"
            class="datepicker form-control"
            :default-value="user.when_issued"
            @input="whenIssuedError = ''"
          />
          <span class="text-danger">{{ whenIssuedError }}</span>
        </div>
      </div>
    </div>
    <input
      style="display: none"
      type="file"
      @change="uploadImage"
      ref="fileInput"
    />
    <button
      style="display: none"
      data-fancybox
      data-src="#thanks_filling"
      ref="thanks_filling"
    ></button>
    <div class="anc_link_bottom">
      <button
        @click="$refs.fileInput.click()"
        class="link_blue mb-1"
      >{{ $t("passport_image") }} {{ fileName }}</button>
      <span class="text-danger mb-4">{{ passportPhotoError }}</span>

      <button type="submit" class="link_blue red">
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm text-white"
        ></span>
        &nbsp;{{ $t("save") }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  props: { user: Object },
  data() {
    return {
      // user: {},
      loading: false,
      modal: null,
      passportPhoto: null,
      fileName: "",
      issuedByError: "",
      seriesError: "",
      numberError: "",
      whenIssuedError: "",
      passportPhotoError: "",
    };
  },
  methods: {
    ...mapMutations(["setQuestionnairePercent"]),
    ...mapActions(["savePassportData"]),
    uploadImage(e) {
      let file = e.target.files[0];
      this.fileName = ": " + file.name;
      let reader = new FileReader();

      if (file["size"] < 5242880) {
        reader.onloadend = (file) => {
          this.passportPhoto = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("File size can not be bigger than 2 MB");
      }
    },
    async submit(e) {
      if (this.validate(e)) {
        this.loading = true;

        const formData = new FormData(e.target);

        formData.append("passport_image", this.passportPhoto);

        let form = Object.fromEntries(formData);

        await this.savePassportData(form);

        this.loading = false;
        this.$bvModal.show("setting-modal")
      }
    },

    validate(e) {
      // this.issuedByError = "";
      // this.seriesError = "";
      // this.numberError = "";
      // this.whenIssuedError = "";
      this.passportPhotoError = "";

      if (e.target.issued_by.value == "") {
        this.issuedByError = this.$t("Required field");
        return false;
      }
      if (e.target.series.value == "") {
        this.seriesError = this.$t("Required field");
        return false;
      }
      if (e.target.number.value == "") {
        this.numberError = this.$t("Required field");
        return false;
      }
      if (e.target.when_issued.value == "") {
        this.whenIssuedError = this.$t("Required field");
        return false;
      }
      if (this.passportPhoto == null) {
        this.passportPhotoError = this.$t("Required field");
        return false;
      }

      return true;
    },
  },
};
</script>
