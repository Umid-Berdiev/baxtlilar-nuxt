<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="11" width="3" height="25" rx="1.5" fill="#000" />
    <rect
      y="14"
      width="3"
      height="25"
      rx="1.5"
      transform="rotate(-90 0 14)"
      fill="#000"
    />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "box",
    },
    width: {
      type: [Number, String],
      default: 25,
    },
    height: {
      type: [Number, String],
      default: 25,
    },
    iconColor: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>

<style></style>
