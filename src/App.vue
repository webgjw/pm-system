<template>
  <div class="app">
    <h1>彩票机选平台</h1>

    <div class="tabs">
      <button
        :class="{ active: type === 'ssq' }"
        @click="type = 'ssq'"
      >
        双色球
      </button>
      <button
        :class="{ active: type === 'd3' }"
        @click="type = 'd3'"
      >
        福彩3D
      </button>
    </div>

    <LotterySelector
      :type="type"
      @select="addHistory"
    />

    <HistoryList v-if="false" :list="history" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LotterySelector from './components/LotterySelector.vue'
import HistoryList from './components/HistoryList.vue'

const type = ref('ssq')
const history = ref([])

function addHistory(record) {
  history.value.unshift(record)
  if (history.value.length > 20) {
    history.value.pop()
  }
  localStorage.setItem('lottery_history', JSON.stringify(history.value))
}

onMounted(() => {
  const data = localStorage.getItem('lottery_history')
  if (data) {
    history.value = JSON.parse(data)
  }
})
</script>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 16px;
  background: #f5f5f5;
}

.app {
  max-width: 600px;
  margin: auto;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tabs button {
  flex: 1;
  padding: 8px;
}

.active {
  background: #333;
  color: #fff;
}

@media (max-width: 600px) {
  .balls span {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
}
</style>