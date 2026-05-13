<template>
  <div class="history">
    <h3>历史记录</h3>
    <ul>
      <li v-for="(item, i) in list" :key="i">
        [{{ item.time }}] {{ item.type }}：
        {{ item.numbers.join(', ') }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  list: Array
})
</script>

<style scoped>
.history {
  margin-top: 16px;
  font-size: 14px;
}
</style>