<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <header class="app-header">
      <h1 class="app-title">福彩机选助手</h1>
      <p class="app-subtitle">安全娱乐 · 理性购彩</p>
    </header>

    <!-- 标签页 -->
    <div class="tabs-container">
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 双色球 -->
      <div v-if="activeTab === 'ssq'" class="lottery-section">
        <div class="lottery-card">
          <div class="card-header">
            <h2>双色球</h2>
            <span class="badge">每周二、四、日开奖</span>
          </div>
          
          <!-- 优化：更小的号码和间距 -->
          <div class="numbers-display-scroll">
            <div class="balls-row ssq-row">
              <div 
                v-for="(num, index) in ssqNumbers.red" 
                :key="'red'+index" 
                class="ball red-ball ssq-ball"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                {{ num.toString().padStart(2, '0') }}
              </div>
              <div class="separator ssq-separator">+</div>
              <div class="ball blue-ball ssq-ball">
                {{ ssqNumbers.blue?.toString().padStart(2, '0') }}
              </div>
            </div>
          </div>
          
          <div class="action-buttons">
            <button class="btn primary" @click="generateSSQ">
              <span class="icon">🎲</span> 机选一注
            </button>
            <button class="btn secondary" @click="generateMultipleSSQ">
              <span class="icon">🎰</span> 机选五注
            </button>
          </div>
          
          <div v-if="ssqHistory.length > 0" class="history-section">
            <div class="history-header">
              <h3>历史记录</h3>
              <button class="copy-all-btn" @click="copyAllHistory('ssq')">
                <span class="copy-icon">📋</span> 复制全部
              </button>
            </div>
            <div class="history-list">
              <div v-for="(item, index) in ssqHistory" :key="index" class="history-item">
                <div class="history-content">
                  <div class="history-numbers">
                    <span v-for="num in item.red" :key="num" class="history-ball red-small">
                      {{ num.toString().padStart(2, '0') }}
                    </span>
                    <span class="separator-small">+</span>
                    <span class="history-ball blue-small">
                      {{ item.blue.toString().padStart(2, '0') }}
                    </span>
                  </div>
                  <span class="history-time">{{ formatTime(item.time) }}</span>
                </div>
                <button class="copy-btn" @click="copySingleHistory('ssq', index)">
                  <span class="copy-icon">📄</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3D -->
      <div v-if="activeTab === '3d'" class="lottery-section">
        <div class="lottery-card">
          <div class="card-header">
            <h2>福彩3D</h2>
            <span class="badge">每日开奖</span>
          </div>
          
          <div class="numbers-display">
            <div class="balls-row">
              <div 
                v-for="(num, index) in d3Numbers" 
                :key="index" 
                class="ball digit-ball"
                :style="{ animationDelay: `${index * 0.15}s` }"
              >
                {{ num }}
              </div>
            </div>
          </div>
          
          <div class="action-buttons">
            <button class="btn primary" @click="generate3D">
              <span class="icon">🎲</span> 机选一注
            </button>
            <button class="btn secondary" @click="generateMultiple3D">
              <span class="icon">🎰</span> 机选五注
            </button>
          </div>
          
          <div v-if="d3History.length > 0" class="history-section">
            <div class="history-header">
              <h3>历史记录</h3>
              <button class="copy-all-btn" @click="copyAllHistory('3d')">
                <span class="copy-icon">📋</span> 复制全部
              </button>
            </div>
            <div class="history-list">
              <!-- 修复：只显示前三个数字，排除time属性 -->
              <div v-for="(item, index) in d3History" :key="index" class="history-item">
                <div class="history-content">
                  <div class="history-numbers">
                    <span v-for="num in getD3Numbers(item)" :key="num" class="history-ball digit-small">
                      {{ num }}
                    </span>
                  </div>
                  <span class="history-time">{{ formatTime(item.time) }}</span>
                </div>
                <button class="copy-btn" @click="copySingleHistory('3d', index)">
                  <span class="copy-icon">📄</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快乐8 -->
      <div v-if="activeTab === 'kl8'" class="lottery-section">
        <div class="lottery-card">
          <div class="card-header">
            <h2>快乐8</h2>
            <span class="badge">每日开奖 · 选一至选十</span>
          </div>
          
          <!-- 玩法选择 -->
          <div class="play-type-selector">
            <div class="selector-label">选择玩法：</div>
            <div class="selector-options">
              <button 
                v-for="n in 10" 
                :key="n"
                :class="['option-btn', { active: kl8PlayType === n }]"
                @click="kl8PlayType = n"
              >
                选{{ n }}
              </button>
            </div>
          </div>
          
          <div class="numbers-display-scroll">
            <div class="balls-row-wrap">
              <div 
                v-for="(num, index) in kl8Numbers" 
                :key="index" 
                class="ball kl8-ball"
                :style="{ animationDelay: `${index * 0.05}s` }"
              >
                {{ num.toString().padStart(2, '0') }}
              </div>
            </div>
          </div>
          
          <div class="selected-count">
            已选择 {{ kl8Numbers.length }} 个号码 (选{{ kl8PlayType }})
          </div>
          
          <div class="action-buttons">
            <button class="btn primary" @click="generateKL8">
              <span class="icon">🎲</span> 机选一注
            </button>
            <button class="btn secondary" @click="generateMultipleKL8">
              <span class="icon">🎰</span> 机选五注
            </button>
          </div>
          
          <div v-if="kl8History.length > 0" class="history-section">
            <div class="history-header">
              <h3>历史记录</h3>
              <button class="copy-all-btn" @click="copyAllHistory('kl8')">
                <span class="copy-icon">📋</span> 复制全部
              </button>
            </div>
            <div class="history-list">
              <div v-for="(item, index) in kl8History" :key="index" class="history-item">
                <div class="history-content">
                  <div class="history-info">
                    <span class="history-play-type">选{{ item.playType }}</span>
                    <div class="history-numbers">
                      <span v-for="num in item.numbers" :key="num" class="history-ball kl8-small">
                        {{ num.toString().padStart(2, '0') }}
                      </span>
                    </div>
                  </div>
                  <span class="history-time">{{ formatTime(item.time) }}</span>
                </div>
                <button class="copy-btn" @click="copySingleHistory('kl8', index)">
                  <span class="copy-icon">📄</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部信息 -->
    <footer class="app-footer">
      <p>本应用仅提供随机号码生成，不保证中奖，请理性购彩</p>
      <p>未满18岁禁止参与任何形式的博彩活动</p>
    </footer>

    <!-- 复制成功提示 -->
    <div v-if="showCopyToast" class="toast-message">
      <span class="toast-icon">✅</span>
      <span class="toast-text">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// 标签页配置
const tabs = [
  { id: 'ssq', name: '双色球' },
  { id: '3d', name: '福彩3D' },
  { id: 'kl8', name: '快乐8' }
]
const activeTab = ref('ssq')

// 双色球数据
const ssqNumbers = reactive({
  red: [],
  blue: null
})
const ssqHistory = ref([])

// 3D数据
const d3Numbers = ref([])
const d3History = ref([])

// 快乐8数据
const kl8Numbers = ref([])
const kl8PlayType = ref(5) // 默认选五
const kl8History = ref([])

// 复制提示
const showCopyToast = ref(false)
const toastMessage = ref('')

// 生成随机数函数
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成不重复的随机数数组
const generateUniqueNumbers = (count, min, max) => {
  const numbers = new Set()
  while (numbers.size < count) {
    numbers.add(generateRandomNumber(min, max))
  }
  return Array.from(numbers).sort((a, b) => a - b)
}

// 获取3D号码数组（排除time属性）
const getD3Numbers = (item) => {
  return [item[0], item[1], item[2]]
}

// 双色球生成
const generateSSQ = () => {
  ssqNumbers.red = generateUniqueNumbers(6, 1, 33)
  ssqNumbers.blue = generateRandomNumber(1, 16)
  
  // 添加到历史记录
  ssqHistory.value.unshift({
    red: [...ssqNumbers.red],
    blue: ssqNumbers.blue,
    time: new Date()
  })
  
  // 限制历史记录数量
  if (ssqHistory.value.length > 5) {
    ssqHistory.value.pop()
  }
}

const generateMultipleSSQ = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      generateSSQ()
    }, i * 300)
  }
}

// 3D生成
const generate3D = () => {
  d3Numbers.value = [
    generateRandomNumber(0, 9),
    generateRandomNumber(0, 9),
    generateRandomNumber(0, 9)
  ]
  
  // 添加到历史记录
  d3History.value.unshift({
    0: d3Numbers.value[0],
    1: d3Numbers.value[1],
    2: d3Numbers.value[2],
    time: new Date()
  })
  
  // 限制历史记录数量
  if (d3History.value.length > 5) {
    d3History.value.pop()
  }
}

const generateMultiple3D = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      generate3D()
    }, i * 300)
  }
}

// 快乐8生成
const generateKL8 = () => {
  kl8Numbers.value = generateUniqueNumbers(kl8PlayType.value, 1, 80)
  
  // 添加到历史记录
  kl8History.value.unshift({
    numbers: [...kl8Numbers.value],
    playType: kl8PlayType.value,
    time: new Date()
  })
  
  // 限制历史记录数量
  if (kl8History.value.length > 5) {
    kl8History.value.pop()
  }
}

const generateMultipleKL8 = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      generateKL8()
    }, i * 300)
  }
}

// 格式化时间
const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// 复制单个历史记录
const copySingleHistory = (type, index) => {
  let textToCopy = ''
  
  if (type === 'ssq') {
    const item = ssqHistory.value[index]
    textToCopy = `双色球：${item.red.map(n => n.toString().padStart(2, '0')).join(' ')} + ${item.blue.toString().padStart(2, '0')}`
  } else if (type === '3d') {
    const item = d3History.value[index]
    textToCopy = `福彩3D：${getD3Numbers(item).join(' ')}`
  } else if (type === 'kl8') {
    const item = kl8History.value[index]
    textToCopy = `快乐8选${item.playType}：${item.numbers.map(n => n.toString().padStart(2, '0')).join(' ')}`
  }
  
  copyToClipboard(textToCopy)
}

// 复制全部历史记录
const copyAllHistory = (type) => {
  let textToCopy = ''
  
  if (type === 'ssq') {
    textToCopy = ssqHistory.value.map((item, i) => 
      `双色球${i+1}：${item.red.map(n => n.toString().padStart(2, '0')).join(' ')} + ${item.blue.toString().padStart(2, '0')}`
    ).join('\n')
  } else if (type === '3d') {
    textToCopy = d3History.value.map((item, i) => 
      `福彩3D${i+1}：${getD3Numbers(item).join(' ')}`
    ).join('\n')
  } else if (type === 'kl8') {
    textToCopy = kl8History.value.map((item, i) => 
      `快乐8选${item.playType}-${i+1}：${item.numbers.map(n => n.toString().padStart(2, '0')).join(' ')}`
    ).join('\n')
  }
  
  copyToClipboard(textToCopy)
}

// 复制到剪贴板
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    toastMessage.value = '已复制到剪贴板！'
    showCopyToast.value = true
    
    // 3秒后隐藏提示
    setTimeout(() => {
      showCopyToast.value = false
    }, 3000)
  } catch (err) {
    console.error('复制失败:', err)
    toastMessage.value = '复制失败，请手动复制'
    showCopyToast.value = true
    
    setTimeout(() => {
      showCopyToast.value = false
    }, 3000)
  }
}

// 初始化生成一注号码
onMounted(() => {
  generateSSQ()
  generate3D()
  generateKL8()
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app-container {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  min-height: 100vh;
  color: #333;
  padding-bottom: env(safe-area-inset-bottom);
  position: relative;
}

/* 头部样式 */
.app-header {
  background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
  color: white;
  padding: 24px 20px;
  text-align: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.2);
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 1px;
}

.app-subtitle {
  font-size: 14px;
  opacity: 0.9;
}

/* 标签页样式 */
.tabs-container {
  padding: 16px 20px 0;
}

.tabs {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tab-btn {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 600;
  color: #666;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-btn.active {
  background: #ff4757;
  color: white;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
}

/* 主要内容区域 */
.main-content {
  padding: 20px;
  width: 100%;
  max-width: 100vw;
}

.lottery-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  width: 100%;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;
}

.card-header h2 {
  font-size: 22px;
  color: #2c3e50;
}

.badge {
  background: #f1f8ff;
  color: #ff4757;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* 修复：添加可滚动容器 */
.numbers-display-scroll {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 30px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.numbers-display-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}

/* 号码显示区域 */
.numbers-display {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
}

.balls-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: clamp(6px, 2vw, 10px);
  min-width: min-content;
  padding: 0 10px;
}

.balls-row-wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(6px, 2vw, 10px);
  min-width: min-content;
  padding: 0 10px;
}

/* 优化：双色球专用行，更小的间距 */
.ssq-row {
  gap: clamp(2px, 1vw, 4px);
}

.separator {
  font-size: 20px;
  font-weight: bold;
  color: #666;
  margin: 0 6px;
  flex-shrink: 0;
}

/* 优化：双色球专用分隔符，更小的间距 */
.ssq-separator {
  margin: 0 2px;
  font-size: 16px;
}

.separator-small {
  font-size: 14px;
  font-weight: bold;
  color: #666;
  margin: 0 4px;
  flex-shrink: 0;
}

/* 优化：双色球号码更小 */
.ball {
  width: clamp(34px, 9vw, 44px);
  height: clamp(34px, 9vw, 44px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: clamp(14px, 3.5vw, 16px);
  animation: popIn 0.5s ease-out forwards;
  opacity: 0;
  transform: scale(0.8);
  flex-shrink: 0;
}

/* 优化：双色球专用球，更小的尺寸 */
.ssq-ball {
  width: clamp(26px, 7vw, 32px);
  height: clamp(26px, 7vw, 32px);
  font-size: clamp(11px, 3vw, 13px);
}

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.red-ball {
  background: linear-gradient(145deg, #ff4757, #ff3838);
  color: white;
  box-shadow: 0 4px 8px rgba(255, 71, 87, 0.3);
}

.blue-ball {
  background: linear-gradient(145deg, #3742fa, #5352ed);
  color: white;
  box-shadow: 0 4px 8px rgba(55, 66, 250, 0.3);
}

.digit-ball {
  background: linear-gradient(145deg, #2ed573, #1dd1a1);
  color: white;
  box-shadow: 0 4px 8px rgba(46, 213, 115, 0.3);
}

.kl8-ball {
  background: linear-gradient(145deg, #ffa502, #ff7f00);
  color: white;
  width: clamp(30px, 8vw, 36px);
  height: clamp(30px, 8vw, 36px);
  font-size: clamp(12px, 3vw, 14px);
  box-shadow: 0 3px 6px rgba(255, 165, 2, 0.3);
}

/* 玩法选择 */
.play-type-selector {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.selector-label {
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
}

.selector-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.option-btn {
  padding: 6px 12px;
  border: 2px solid #e0e6ef;
  background: white;
  border-radius: 20px;
  font-size: clamp(12px, 3vw, 14px);
  font-weight: 600;
  color: #666;
  transition: all 0.2s ease;
}

.option-btn.active {
  border-color: #ffa502;
  background: #fff9f0;
  color: #ffa502;
}

.selected-count {
  text-align: center;
  font-size: clamp(13px, 3.5vw, 14px);
  color: #666;
  margin: 10px 0 20px;
  font-weight: 500;
}

/* 按钮样式 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  min-width: 140px;
  padding: 14px 0;
  border: none;
  border-radius: 12px;
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary {
  background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
}

.btn.secondary {
  background: #f1f8ff;
  color: #3742fa;
  border: 2px solid #e0e6ef;
}

.btn:active {
  transform: translateY(2px);
}

.icon {
  font-size: 18px;
}

/* 历史记录 */
.history-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.history-header h3 {
  font-size: 16px;
  color: #2c3e50;
}

.copy-all-btn {
  background: #f1f8ff;
  color: #3742fa;
  border: 1px solid #e0e6ef;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-all-btn:active {
  transform: scale(0.95);
}

.copy-icon {
  font-size: 14px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.history-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.history-numbers {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.history-ball {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.red-small {
  background: #ff4757;
  color: white;
}

.blue-small {
  background: #3742fa;
  color: white;
}

.digit-small {
  background: #2ed573;
  color: white;
}

.kl8-small {
  background: #ffa502;
  color: white;
}

.history-time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}

.history-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.history-play-type {
  background: #fff9f0;
  color: #ffa502;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.copy-btn {
  background: transparent;
  border: 1px solid #ddd;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.copy-btn:active {
  transform: scale(0.95);
  background: #f0f0f0;
}

/* 底部信息 */
.app-footer {
  text-align: center;
  padding: 20px;
  color: #888;
  font-size: clamp(11px, 3vw, 12px);
  line-height: 1.5;
}

/* 复制提示 */
.toast-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.toast-icon {
  font-size: 16px;
}

.toast-text {
  font-size: 14px;
  font-weight: 500;
}

/* 响应式断点 */
@media (max-width: 380px) {
  .app-title { font-size: 24px; }
  .card-header h2 { font-size: 18px; }
  .badge { font-size: 11px; padding: 3px 8px; }
  .btn { min-width: 100%; }
  .history-content { flex-direction: column; align-items: flex-start; }
  .history-time { align-self: flex-end; }
}

@media (min-width: 768px) {
  .main-content { max-width: 500px; margin: 0 auto; }
  .lottery-card { padding: 24px; }
}
</style>