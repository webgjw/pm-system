<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  value: Number
})

const show = ref(0)

watch(
  () => props.value,
  (val) => {
    let current = 0
    const step = Math.ceil(val / 20)

    const timer = setInterval(() => {
      current += step
      if (current >= val) {
        current = val
        clearInterval(timer)
      }
      show.value = current
    }, 30)
  },
  { immediate: true }
)
</script>

<template>
  <span class="ball">
    {{ show }}
  </span>
</template>

<style scoped>
.ball {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>