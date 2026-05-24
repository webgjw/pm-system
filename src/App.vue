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
    <p v-if="type==='d3'"><button @click="viewRecords">查看3D最近30期开奖结果</button><br/><br/></p>
    <p v-if="type==='ssq'">待过滤蓝球号码: <input type="text" v-model="filterSsq"><button @click="saveBlue">保存</button></p>
    <div v-if="type==='d3'">
      <input v-model="value" /><br/><br/>
      <button @click="saveRecord">保存到尾部</button><br/><br/>
      <button @click="saveRecord2">保存到头部</button><br/><br/>
      <button @click="clearRecords">清空历史开奖记录</button>
    </div>

    <ul v-show="showRecords" class="dialog-records">
      <button @click="showRecords=false">关闭</button>
      <li v-for="(item, index) in historyRecords" :key="index">({{index+1}}) {{item}}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue'
import LotterySelector from './components/LotterySelector.vue'
import HistoryList from './components/HistoryList.vue'
import { getArray, saveArray, clearArray } from './utils/indexedDB'

const type = ref('d3')
const history = ref([])
let filterSsq = ref([])

const saveBlue = async () => {
  if (filterSsq.value.length === 0) {
    await saveArray('lottery_records_ssq', []);
    return;
  }
  let arr = [];
  if (typeof filterSsq.value === 'string') {
    arr = filterSsq.value.split(',');
  } else {
    arr = [...filterSsq.value];
  }
  await saveArray('lottery_records_ssq', arr.filter(str => str !== ''));
};

const value = ref('');
const saveRecord = async () => {
  let lottery_records = await getArray('lottery_records');
  if (value.value) {
    if (!lottery_records.includes(value.value)) {
      if (lottery_records.length >= 30) {
        alert("已经达到30组号码了！")
        return;
      }
      lottery_records.push(value.value);
      value.value = '';
    } else {
      alert('号码已存在');
      return;
    }
    await saveArray('lottery_records', lottery_records);
  } else {
    alert('请输入合法的3d号码');
  }
};
const saveRecord2 = async () => {
  let lottery_records = await getArray('lottery_records');
  if (value.value) {
    if (!lottery_records.includes(value.value)) {
      if (lottery_records.length >= 30) {
        lottery_records.pop();
      }
      lottery_records.unshift(value.value);
      value.value = '';
    } else {
      alert('号码已存在');
      return;
    }
    await saveArray('lottery_records', lottery_records);
  } else {
    alert('请输入合法的3d号码');
  }
};

let showRecords = ref(false);
let historyRecords = ref([]);
let reversedList = computed(() => [...historyRecords.value].reverse());
const viewRecords = async () => {
  showRecords.value = true;
  historyRecords.value = await getArray('lottery_records');
};

const clearRecords = async () => {
  if (confirm("确定要清除历史开奖记录吗?")) {
    await clearArray('lottery_records');
  }
};

function addHistory(record) {
}

onMounted(async () => {
  const lottery_records_ssq = await getArray('lottery_records_ssq');
  if (lottery_records_ssq?.length > 0) {
    filterSsq.value = lottery_records_ssq;
  } else {
    filterSsq.value = [];
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
    width: 28px;
    height: 28px;
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