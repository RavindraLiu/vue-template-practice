<!-- 菜单外链处理 -->
<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { isExternal } from "@/utils/validate"
//  / 针对路径是外链 就渲染为a标签 如果是正常路由路径 就渲染为 router-link
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

// 判断接受的路由是否为外链
const isExt = computed(() => isExternal(props.to))
const type = computed(() => {
  if (isExt.value) {
    return "a"
  }
  // router-link 只需要一个to props
  return "router-link"
})

const linkProps = computed(() => {
  if (isExt.value) {
    return {
      href: props.to,
      target: "_blank",
      rel: "noopener"
    }
  }

  return {
    to: props.to
  }
})
</script>
