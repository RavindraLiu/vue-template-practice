<template>
  <h4 @click="isCollapse = !isCollapse">展开测试</h4>
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuText"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
    :collapse="isCollapse"
    collapse-transition
  >
    <SidebarItem></SidebarItem>
  </el-menu>
</template>

<script lang="ts" setup>
import scssVariables from "@/assets/styles/variables.module.scss"
import SidebarItem from "./SidebarItem.vue"
import { ref, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const activeMenu = computed(() => route.path)
const isCollapse = ref(false)
</script>

<style scoped lang="scss"></style>
