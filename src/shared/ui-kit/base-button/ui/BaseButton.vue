<script setup lang="ts">
import { EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit'
import { BaseLoader } from '@/shared/ui-kit'
import { ref } from 'vue'
interface IProps {
  buttonSize: EnumButtonSizes
  buttonStyle: EnumButtonStyles
}
defineProps<IProps>()

const isLoading = ref<Boolean>(false)

const setLoadingStatus = (value: Boolean) => (isLoading.value = value)

defineExpose({ setLoadingStatus })
</script>

<template>
  <button
    class="base-button"
    :class="`base-button__size-${EnumButtonSizes[buttonSize]} base-button__style-${
      EnumButtonStyles[buttonStyle]
    } base-button__style-${EnumButtonStyles[buttonStyle]}_${isLoading ? `disable` : 'normal'}`"
  >
    <base-loader class="base-button__spinner" v-if="isLoading" />
    <p class="base-button__text" :class="{ 'base-button__text_hidden': isLoading }">
      <slot />
    </p>
  </button>
</template>

<style scoped lang="scss">
@import './styles.module.scss';
</style>
