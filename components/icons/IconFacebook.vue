<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M20.5151 15.7501L21.293 10.683H16.4306V7.39473C16.4306 6.00873 17.1096 4.65685 19.2875 4.65685H21.4977V0.343102C21.4977 0.343102 19.4922 0.000976562 17.5742 0.000976562C13.5702 0.000976562 10.9531 2.42823 10.9531 6.8216V10.6839H6.50195V15.751H10.9531V28.001H16.4306V15.751L20.5151 15.7501Z"
        fill="#337AAE"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="28" height="28" fill="white" />
      </clipPath>
    </defs>
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

<style></style>
