<template>
  <div class="app">
    <h1><img src="./assets/logo-top.png" width="260" height="50"></h1>

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
    <button @click="viewRecords">查看最近30期开奖结果</button><br/><br/>
    <input v-model="value" /><button @click="saveRecord">保存</button><br/><br/>
    <button @click="clearRecords">清空历史开奖记录</button>

    <ul v-show="showRecords" class="dialog-records">
      <button @click="showRecords=false">关闭</button>
      <li v-for="(item, index) in historyRecords" :key="index">({{index+1}}) {{item}}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import LotterySelector from './components/LotterySelector.vue'
import HistoryList from './components/HistoryList.vue'

const type = ref('ssq')
const history = ref([])

const value = ref('');
const saveRecord = () => {
  const lottery_records = localStorage.getItem('lottery_records');
  let result = [];
  if (lottery_records) {
    result = JSON.parse(lottery_records);
  }
  if (value.value) {
    if (!result.includes(value.value)) {
      result.push(value.value);
      value.value = '';
    }
    localStorage.setItem('lottery_records', JSON.stringify(result));
  } else {
    alert('请输入合法的3d号码');
  }
};

let showRecords = ref(false);
let historyRecords = reactive([]);
const viewRecords = () => {
  showRecords.value = true;
  const lottery_records = localStorage.getItem('lottery_records');
  historyRecords = lottery_records? JSON.parse(lottery_records) : [];
};

const clearRecords = () => {
  if (confirm("确定要清除历史开奖记录吗?")) {
    localStorage.removeItem('lottery_records');
  }
};

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
    width: 24px;
    height: 24px;
    font-size: 10px;
  }
}

.dialog-records {
  position: absolute;
  top: 50%;
  margin-top: -150px;
  left: 0;
  width: 100%;
  height: 300px;
  overflow-y: auto;
  background: #ccc;
  color: #000;
  box-sizing: border-box;
  padding-top: 40px;
}

.dialog-records li {
  list-style-type: none;
  text-align: left;
}
</style>