<template>
  <div class="container">
    <h2>{{ type === 'ssq' ? '双色球' : '福彩3D' }}</h2>

    <div class="balls">
      <span
        v-for="(num, i) in result"
        :key="i"
        :class="type === 'ssq' && i < 6 ? 'red' : 'blue'"
      >
        {{ num }}
      </span>
    </div>

    <div class="actions">
      <button @click="generate">机选</button>
      <button @click="clear">清空</button>
      <button @click="copy">复制</button>
      <input type="checkbox" v-model="filterFlag">过滤
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { uniqueRandomList, randomInt } from '../utils/random'
import { getArray } from '../utils/indexedDB'

const props = defineProps({
  type: {
    type: String,
    default: 'ssq' // ssq | d3
  }
})

const emit = defineEmits(['select'])

const result = ref([])
const filterFlag = ref(true);

function formatArray(arr) {
  const padded = arr.map(n => n.toString().padStart(2, '0'));
  return `${padded.slice(0, 6).join(' ')} - ${padded[6]}`;
}

const copy = () => {
  if (result.value.length === 0) {
    alert('复制失败');
    return;
  }
  const text = props.type === 'ssq' ? formatArray(result.value) : result.value.join(' ');

  navigator.clipboard.writeText(text)
    .then(() => {
      alert('已复制');
    })
    .catch(err => {
      console.error('复制失败', err);
    });
};

function generateSSQ() {
  const red = uniqueRandomList(6, 1, 33)
  const blue = randomInt(1, 16)
  return [...red, blue]
}

async function generate3D() {
  let excludeList = [];
  if (filterFlag.value) {
    excludeList = await getArray('lottery_records');
  }
  // 只有过滤数组不为空时才创建 Set
  const excludeSet = excludeList.length > 0
    ? new Set(excludeList.map(item => item))
    : null;

  let result;

  do {
    const nums = new Set();

    while (nums.size < 3) {
      nums.add(Math.floor(Math.random() * 10));
    }

    result = [...nums].sort((a, b) => a - b);
  } while (
    excludeSet &&
    excludeSet.has(result.join(','))
  );
  return result;
}

async function generate() {
  result.value =
    props.type === 'ssq' ? generateSSQ() : await generate3D()

  emit('select', {
    type: props.type,
    numbers: result.value,
    time: new Date().toLocaleString()
  })
}

function clear() {
  result.value = []
}

watch(
  () => props.type,
  () => clear()
)
</script>

<style scoped>
.container {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
}

.balls {
  display: flex;
  gap: 8px;
  margin: 12px 0;
  flex-wrap: wrap;
}

.red {
  background: #e53e3e;
}

.blue {
  background: #3182ce;
}

.balls span {
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: bold;
}

.actions button {
  margin-right: 8px;
}
</style>