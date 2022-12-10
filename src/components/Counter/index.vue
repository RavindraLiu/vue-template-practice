<template>
  <div>
    <button @click="counterClick">添加</button>
    <span>{{ counter.counter }}</span>
  </div>
</template>

<script setup lang="ts">
// 返回的是一个对象
import { useCounterStore } from "@/store/counter"
const counter = useCounterStore()

const counterClick = () => {
  counter.increment()
}
</script>
