<script setup>
import { ref, onMounted } from 'vue'

const history = ref([])

onMounted(() => {
  history.value = JSON.parse(localStorage.getItem('lottery_history') || '[]')
})
</script>

<template>
  <div class="page">
    <h2>📜 历史记录</h2>

    <div v-if="history.length === 0" class="empty">
      暂无记录
    </div>

    <div v-else class="list">
      <div
        v-for="(item, index) in history"
        :key="index"
        class="item"
      >
        <div class="top">
          <span class="type">{{ item.type }}</span>
          <span class="time">{{ item.time }}</span>
        </div>
        <p class="nums">{{ item.numbers }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 16px;
  background: #f5f6fa;
  min-height: 100vh;
}

h2 {
  text-align: center;
  margin-bottom: 12px;
}

.empty {
  text-align: center;
  color: #999;
  margin-top: 60px;
}

.list {
  margin-top: 12px;
}

.item {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.top {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
}

.type {
  font-weight: bold;
  color: #666;
}

.nums {
  font-size: 15px;
  margin-top: 8px;
  letter-spacing: 1px;
}
</style>