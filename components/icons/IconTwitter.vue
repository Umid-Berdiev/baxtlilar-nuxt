<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.25 6.99968L23.625 7.43718L25.375 5.24968L22.3125 6.12468C18.375 1.74968 12.25 6.56218 14 10.4997C7 10.4997 3.5 5.24968 3.5 5.24968C3.5 5.24968 0.875 9.18718 5.25 12.2497L2.625 11.3747C2.625 13.9997 4.375 15.7497 7.4375 16.6247H4.375C6.125 20.1247 9.1875 20.1247 9.1875 20.1247C9.1875 20.1247 6.5625 22.3122 1.75 22.3122C16.1875 29.3122 24.9375 16.1872 23.625 9.18718L26.25 6.99968Z"
      fill="#337AAE"
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
      default: 28,
    },
    height: {
      type: [Number, String],
      default: 28,
    },
    iconColor: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>
