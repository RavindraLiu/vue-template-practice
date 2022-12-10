<template>
  <div>dash board</div>
  <svg-icon icon-class="bug"></svg-icon>
  <svg-icon
    icon-class="404"
    class-name="custom-class"
    @click="sayHi"
  ></svg-icon>
  <br />
  <br />
  缓存测试 <input type="text" />
  <el-button @click="sayHi">按钮</el-button>
</template>

<script setup lang="ts">
const { proxy } = getCurrentInstance()!
const sayHi = () => {
  console.log("hi")
  proxy?.$message.success("恭喜你，这是一条成功消息")
}
</script>

<style lang="scss">
.custom-class {
  font-size: 200px;
  color: green;
}
</style>
