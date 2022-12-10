<template>
  <section class="app-wrapper">
    <div class="sidebar-container"><sidebar></sidebar></div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">navbar</div>
        <div class="tags-view">tags-view</div>
      </div>
      <!-- <div class="app-main">
        <h2>app main</h2>
        <router-view></router-view>
      </div> -->
      <app-main></app-main>
    </div>
  </section>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar/index.vue"
import AppMain from "@/components/AppMain.vue"
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      background-color: cyan;
      .navbar {
        height: 50px;
        background-color: #1890ff;
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* main = 100% - navbar + tagsview */
      min-height: calc(100vh - 84px);
      background: red;
    }
  }
}
</style>
