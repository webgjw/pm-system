<script setup>
import RollingNumber from './RollingNumber.vue'

defineProps({
  title: String,
  numbers: Array,
  colorMap: Array
})
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>

    <div class="balls">
      <RollingNumber
        v-for="(n, i) in numbers"
        :key="i"
        :value="n"
        :style="{
          background: colorMap?.[i] || '#409eff'
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
}

.balls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>