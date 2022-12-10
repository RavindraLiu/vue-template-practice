<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
}
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
