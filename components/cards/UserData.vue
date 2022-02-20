<template>
  <div>
    <p>{{ user.about }}</p>
    <div class="pret_main">
      <div class="about_user_pret">
        <span>{{ $t("citizenship") }}</span>
        <span>{{ user.citizenship ? user.citizenship.name : user.country_name }}</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("religion") }}</span>
        <span>{{ user.religion && user.religion.name }}</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("height") }}</span>
        <span>{{ user.height }} см</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("weight") }}</span>
        <span>{{ user.weight }} кг</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("zodiac_sign") }}</span>
        <span>{{ $t(user.znak_zodiak || "") }}</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("eye_color") }}</span>
        <span>{{ user.eye_color }}</span>
      </div>

      <div class="about_user_pret">
        <span>{{ $t("education") }}</span>
        <span>{{ user.education }}</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("specialty") }}</span>
        <span>{{ user.specialty }}</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("relation_smoking") }}</span>
        <span>{{ $t("smoking_" + user.smoking) }}</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("relation_alcohol") }}</span>
        <span>{{ $t("alcohol_" + user.alcohol) }}</span>
      </div>
      <div class="about_user_pret">
        <span>{{ $t("relation_drugs") }}</span>
        <span>{{ $t("drugs_" + user.drugs) }}</span>
      </div>
    </div>
    <h2>{{ $t("hobby") }}</h2>
    <p>{{ user.hobby }}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, default: {} },
  },
};
</script>
