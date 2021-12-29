<template>
  <div>
    <div class="anceta_form">
      <div class="steps_form">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div class="active">{{ $t("confirmation") }}</div>
      </div>
      <br />
      <form @submit.prevent="submit" enctype="multipart/form-data">
        <div class="row">
          <div class="col-lg-8">
            <div class="form-group">
              <label for id="issued-by-label">{{ $t("issued_by") }}</label>
              <input type="text" name="issued_by" @input="issuedByError = ''" />
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
              <label for id="series-label">{{ $t("serie") }}</label>
              <input
                type="text"
                style="text-transform: uppercase"
                placeholder="AB"
                name="series"
                @input="seriesError = ''"
              />
              <span class="text-danger">{{ seriesError }}</span>
            </div>
          </div>
          <div class="col-sm-4 col-3">
            <div class="form-group">
              <label for id="number-label">{{ $t("number") }}</label>
              <input
                type="number"
                placeholder="1234567"
                name="number"
                @input="numberError = ''"
              />
              <span class="text-danger">{{ numberError }}</span>
            </div>
          </div>
          <div class="col-sm-4 col-6">
            <div class="form-group">
              <label for id="when_issued-label">
                {{
                  $t("when_given")
                }}
              </label>
              <a-date-picker
                :placeholder="$t('select_date')"
                format="YYYY-MM-DD"
                name="when_issued"
                id="when_issued"
                class="datepicker form-control"
                @input="when_issuedError = ''"
              />
              <span class="text-danger">{{ when_issuedError }}</span>
            </div>
          </div>
        </div>
        <input
          style="display: none"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          @change="uploadImage"
          ref="fileInput"
        />
        <button
          style="display: none"
          data-fancybox
          data-src="#thanks_filling"
          ref="thanks_filling"
        />
        <div class="anc_link_bottom" id="passport_image-label">
          <button
            @click="$refs.fileInput.click()"
            class="link_blue mb-2"
          >{{ $t("passport_image") }}{{ file_name }}</button>
          <span class="text-danger mb-5">{{ passport_imageError }}</span>
          <button type="submit" class="link_blue red">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm text-white"
            ></span>
            &nbsp; {{ $t("save") }}
          </button>
        </div>
      </form>
    </div>

    <b-modal class="language_popup_style" id="thanksFillingModal">
      <h2>{{ $t("thanks_fill_questionnaire") }}</h2>
      <h4>{{ $t("Your profile is pending") }}</h4>
      <nuxt-link
        :to="localePath('/home')"
        class="link_blue red"
      >{{ $t("next") }}</nuxt-link>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  layout: "questionnaire",
  mounted() {
    this.setQuestionnairePercent(80);
  },
  data() {
    return {
      loading: false,
      modal: null,
      passport_image: null,
      file_name: "",
      issuedByError: "",
      seriesError: "",
      numberError: "",
      when_issuedError: "",
      passport_imageError: "",
    };
  },
  methods: {
    ...mapMutations({
      setQuestionnairePercent: "questionnaire/setQuestionnairePercent",
    }),
    ...mapActions({ savePassportData: "questionnaire/savePassportData" }),
    uploadImage(e) {
      let file = e.target.files[0];
      this.file_name = ": " + file.name;
      let reader = new FileReader();

      if (file["size"] < 5242880) {
        reader.onloadend = (file) => {
          this.passport_image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert(this.$t("File size can not be bigger than 5 MB"));
      }
    },
    async submit(e) {
      if (this.validate(e)) {
        this.loading = true;
        const formData = new FormData(e.target);
        formData.append("passport_image", this.passport_image);
        let form = Object.fromEntries(formData);
        await this.savePassportData(form);
        this.loading = false;
        this.$bvModal.show('thanksFillingModal');
      }
    },
    validate(e) {
      this.passport_imageError = "";
      if (this.passport_image == null) {
        this.passport_imageError = this.$t("Required field");
        document.getElementById("passport_image-label").scrollIntoView();
        return false;
      }
      if (e.target.when_issued.value == "") {
        this.when_issuedError = this.$t("Required field");
        document.getElementById("when_issued-label").scrollIntoView();
        return false;
      }
      if (e.target.number.value == "") {
        this.numberError = this.$t("Required field");
        document.getElementById("number-label").scrollIntoView();
        return false;
      }
      if (e.target.series.value == "") {
        this.seriesError = this.$t("Required field");
        document.getElementById("series-label").scrollIntoView();
        return false;
      }
      if (e.target.issued_by.value == "") {
        this.issuedByError = this.$t("Required field");
        document.getElementById("issued-by-label").scrollIntoView();
        return false;
      }

      return true;
    },
  },
};
</script>
