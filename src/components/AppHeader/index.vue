<template>
  <div class="header">
    <div class="app-center">
      <div class="app-name">
        <span>响水智慧农机管理平台</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  background-image: url("@/assets/images/top_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: 90px;

  .app-center {
    position: absolute;
    left: 50%;
    top: 7px;
    transform: translateX(-50%);
    height: 52px;
    font-size: 40px;
    font-family: YouSheBiaoTiHei;
    color: #ffffff;
    line-height: 52px;
    letter-spacing: 2px;
  }
}
</style>
