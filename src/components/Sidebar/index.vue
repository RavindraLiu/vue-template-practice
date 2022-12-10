<template>
  <h4 @click="isCollapse = !isCollapse">展收测试</h4>
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
    :collapse="isCollapse"
    :collapse-transition="true"
  >
    <!-- 循环sidebar-item -->
    <sidebar-item
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    >
    </sidebar-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import scssVariables from "@/assets/styles/variables.module.scss"
import SidebarItem from "./SidebarItem.vue"
import routes from "@/router/routes"
const route = useRoute()
const activeMenu = computed(() => route.path)
const isCollapse = ref(false)
const menuRoutes = computed(() => routes)
</script>
