<template>
  <section class="app-wrapper">
    <Sidebar></Sidebar>
    <article>
      <header>
        <nav></nav>
        <div class="tags-view">tags-view</div>
      </header>
      <body>
        <h2>app main</h2>
        <router-view></router-view>
      </body>
    </article>
  </section>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar/index.vue"
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  article {
    flex: 1;
    display: flex;
    flex-direction: column;
    header {
      background-color: cyan;
      nav {
        height: 50px;
        background-color: #1890ff;
      }

      .tags-view {
        height: 34px;
        background-color: #12efff;
      }
    }

    body {
      min-height: calc(100vh - 84px);
      background-color: red;
    }
  }
}
</style>
