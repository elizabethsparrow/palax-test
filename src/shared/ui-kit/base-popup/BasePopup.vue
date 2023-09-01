<script setup lang="ts">
import { ref } from 'vue'

interface currentStatus {
  resolve: Function
  reject: Function
}

const isOpen = ref<Boolean>(false)
let currentStatus = ref<currentStatus>({
  resolve: () => {},
  reject: () => {}
})

const open = () => {
  const popupPromise = new Promise((resolve, reject) => {
    currentStatus.value.resolve = resolve
    currentStatus.value.reject = reject
  })
  isOpen.value = true
  return popupPromise
}

const confirm = () => {
  isOpen.value = false

  currentStatus.value.resolve(true)
}
const close = () => {
  isOpen.value = false
  currentStatus.value.resolve(false)
}

defineExpose({ open, confirm, close })
</script>

<template>
  <div class="base-popup" :class="{ 'base-popup_active': isOpen }" v-if="isOpen">
    <div class="base-popup__container">
      <div class="base-popup__card">
        <slot />
      </div>
    </div>
    <span class="base-popup__background" @click="close"></span>
  </div>
</template>

<style lang="scss">
@import './styles.module.scss';
</style>
