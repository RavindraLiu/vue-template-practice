<template>
  <div class="sidebar-item-container" v-if="!item.meta || !item.meta.hidden">
    <!-- 只有一个孩子的情况 -->
    <template
      v-if="
        theOnlyOneChildRoute &&
        (!theOnlyOneChildRoute.children ||
          theOnlyOneChildRoute?.noShowingChildren)
      "
    >
      <sidebar-item-link
        v-if="theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <el-icon v-if="icon">
            <svg-icon class="menu-icon" :icon-class="icon"></svg-icon>
          </el-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <svg-icon class="menu-icon" :icon-class="item.meta.icon"> </svg-icon>
        </el-icon>
        <span class="submenu-title">{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        is-nest
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue"
import type { Router, RouteRecordRaw } from "vue-router"
import path from "path-browserify"
import { isExternal } from "@/utils/validate"
import SidebarItemLink from "./SidebarItemLink.vue"
const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  basePath: {
    type: String,
    required: true
  }
})
// 渲染菜单子路由，
// 比如我们的路由 一级路由一般都是layout组件, 二级路由才是对应的菜单组件
const showingChildNumber = computed(() => {
  const children = (props.item.children || []).filter((child) => {
    if (child.meta && child.meta.hidden) return false
    return true
  })
  // 当前项要显示的路由数
  return children.length
})

// 要渲染的单个路由 如果该路由只有一个子路由m,默认直接显示子路由
const { item } = toRefs(props)
const theOnlyOneChildRoute = computed<
  (RouteRecordRaw & { noShowingChildren?: boolean }) | null
>(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  // 只有一个子路由，还是要筛选meta里有无hidden属性，hidden：true过滤出去
  // 路由meta里我们配置hidden属性表示不渲染成菜单，比如 login 404页面
  if (item.value.children) {
    for (const child of item.value.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  // showingChildNumber === 0 无可渲染的子路由
  // 无可渲染的children使，把当前item作为仅有的子路由进行渲染

  return {
    ...props.item,
    path: "", // resolvePath 避免resolve拼接的时候，重复拼接
    noShowingChildren: true
  }
})

const icon = computed(() => {
  return (
    theOnlyOneChildRoute.value?.meta?.icon ||
    (props.item.meta && props.item.meta.icon)
  )
})

const resolvePath = (childPath: string) => {
  if (isExternal(childPath)) {
    return childPath
  }
  return path.resolve(props.basePath, childPath)
}
</script>
