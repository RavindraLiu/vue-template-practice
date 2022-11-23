<template>
  <div>
    <button @click="counterClick">添加</button>
    <span>{{ counter.counter }}</span>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/store/counter"
const counter = useCounterStore()

const counterClick = () => {
  counter.increment()
}
</script>
