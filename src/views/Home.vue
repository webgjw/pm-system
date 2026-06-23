<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import {
  genSSQ,
  genDLT,
  genKL8,
  genFC3D,
  genQLC,
  genPL3,
  genPL5,
  genQXC
} from '../utils/random'
import LotteryCard from '../components/LotteryCard.vue'

const activeTab = ref('fc')

const state = reactive({
  ssq: null,
  kl8: null,
  fc3d: null,
  qlc: null,
  dlt: null,
  pl3: null,
  pl5: null,
  qxc: null
})

function saveHistory(type, data) {
  let str = ''

  if (Array.isArray(data)) {
    str = data.join(' ')
  } 
  else if (data.red && data.blue) {
    // 双色球
    str = `${data.red.join(' ')} + ${data.blue.join(' ')}`
  }
  else if (data.front && data.back) {
    // 大乐透
    str = `${data.front.join(' ')} + ${data.back.join(' ')}`
  }
  else if (data.main && data.special) {
    // 七乐彩
    str = `${data.main.join(' ')} + ${data.special.join(' ')}`
  }
  else {
    str = JSON.stringify(data)
  }

  const list = JSON.parse(localStorage.getItem('lottery_history') || '[]')
  list.unshift({
    type,
    time: new Date().toLocaleString(),
    numbers: str
  })

  localStorage.setItem(
    'lottery_history',
    JSON.stringify(list.slice(0, 50))
  )
}

function randomAll() {
  if (activeTab.value === 'fc') {
    state.ssq = genSSQ()
    saveHistory('ssq', state.ssq)
    state.kl8 = genKL8()
    saveHistory('kl8', state.kl8)
    state.fc3d = genFC3D()
    saveHistory('fc3d', state.fc3d)
    state.qlc = genQLC()
    saveHistory('qlc', state.qlc)
  } else {
    state.dlt = genDLT()
    saveHistory('dlt', state.dlt)
    state.pl3 = genPL3()
    saveHistory('pl3', state.pl3)
    state.pl5 = genPL5()
    saveHistory('pl5', state.pl5)
    state.qxc = genQXC()
    saveHistory('qxc', state.qxc)
  }
}

function random(type) {
  state[type] = eval(`gen${type.toUpperCase()}()`)
  saveHistory(type, state[type])
}

let lastX = 0
let lastY = 0
let lastZ = 0
let shakeTime = 0

function handleShake(event) {
  const { x, y, z } = event.accelerationIncludingGravity || {}
  if (!x) return

  const delta =
    Math.abs(x - lastX) +
    Math.abs(y - lastY) +
    Math.abs(z - lastZ)

  if (delta > 25 && Date.now() - shakeTime > 1500) {
    shakeTime = Date.now()
    randomAll()
  }

  lastX = x
  lastY = y
  lastZ = z
}

onMounted(() => {
  window.addEventListener('devicemotion', handleShake)
})

onUnmounted(() => {
  window.removeEventListener('devicemotion', handleShake)
})
</script>

<template>
  <div class="page">
    <h1>🎲 彩票机选助手</h1>

    <van-tabs v-model:active="activeTab" swipeable>
      <van-tab title="福利彩票" name="fc">
        <div class="tab-content">
          <button class="btn" @click="randomAll">一键机选福彩</button>

          <LotteryCard
            v-if="state.ssq"
            title="双色球"
            :numbers="[...state.ssq.red, ...state.ssq.blue]"
            :colorMap="[...Array(6).fill('#f56c6c'), '#409eff']"
          />
          <button class="mini-btn" @click="random('ssq')">机选双色球</button>

          <LotteryCard
            v-if="state.kl8"
            title="快乐8"
            :numbers="state.kl8"
            :colorMap="Array(10).fill('#722ed1')"
          />
          <button class="mini-btn" @click="random('kl8')">机选快乐8</button>

          <LotteryCard
            v-if="state.fc3d"
            title="福彩3D"
            :numbers="state.fc3d"
            :colorMap="Array(3).fill('#e6a23c')"
          />
          <button class="mini-btn" @click="random('fc3d')">机选福彩3D</button>

          <LotteryCard
            v-if="state.qlc"
            title="七乐彩"
            :numbers="[...state.qlc.main, ...state.qlc.special]"
            :colorMap="[...Array(7).fill('#67c23a'), '#f56c6c']"
          />
          <button class="mini-btn" @click="random('qlc')">机选七乐彩</button>
        </div>
      </van-tab>

      <van-tab title="体育彩票" name="tc">
        <div class="tab-content">
          <button class="btn" @click="randomAll">一键机选体彩</button>

          <LotteryCard
            v-if="state.dlt"
            title="大乐透"
            :numbers="[...state.dlt.front, ...state.dlt.back]"
            :colorMap="[...Array(5).fill('#e6a23c'), ...Array(2).fill('#67c23a')]"
          />
          <button class="mini-btn" @click="random('dlt')">机选大乐透</button>

          <LotteryCard
            v-if="state.pl3"
            title="排列三"
            :numbers="state.pl3"
            :colorMap="Array(3).fill('#409eff')"
          />
          <button class="mini-btn" @click="random('pl3')">机选排列三</button>

          <LotteryCard
            v-if="state.pl5"
            title="排列五"
            :numbers="state.pl5"
            :colorMap="Array(5).fill('#909399')"
          />
          <button class="mini-btn" @click="random('pl5')">机选排列五</button>

          <LotteryCard
            v-if="state.qxc"
            title="七星彩"
            :numbers="state.qxc"
            :colorMap="Array(7).fill('#b37feb')"
          />
          <button class="mini-btn" @click="random('qxc')">机选七星彩</button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.page {
  background: #f5f6fa;
  min-height: 100vh;
}
.tab-content {
  padding: 12px;
}
.btn {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.mini-btn {
  width: 100%;
  padding: 10px;
  margin: 6px 0 14px;
  border-radius: 10px;
  border: none;
  background: #fff;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
</style>