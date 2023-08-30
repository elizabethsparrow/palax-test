<script setup lang="ts">
import { EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit'
interface IProps {
  buttonSize: EnumButtonSizes
  buttonStyle: EnumButtonStyles
}

defineProps<IProps>()
</script>

<template>
  <button
    class="base-button"
    :class="`base-button__size-${EnumButtonSizes[buttonSize]} base-button__style-${EnumButtonStyles[buttonStyle]} `"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import './styles.module.scss';
</style>
