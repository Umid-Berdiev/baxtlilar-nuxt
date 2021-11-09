<template>
  <div class="loading-page">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading-page {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100%; */
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  /* padding-top: 200px; */
  /* font-size: 30px; */
  /* font-family: sans-serif; */
}
.spinner {
  width: 40px;
  height: 40px;
  background-color: orangered;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1s infinite ease-in-out;
  animation: sk-rotateplane 1s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }
  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
