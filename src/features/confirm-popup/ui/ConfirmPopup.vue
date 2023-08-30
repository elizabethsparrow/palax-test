<script setup lang="ts">
import { BasePopup } from '@/shared/ui-kit/base-popup'
import { BaseButton, EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit/base-button'
import { ref } from 'vue'

const refBasePopup = ref(),
  title = ref<String>('Confirm Popup!'),
  message = ref<String>('Thanks for watching!')

const open = (newTitle: String | underfined, newMessage: String | underfined) => {
  if (!!newTitle) title.value = newTitle
  if (!!newMessage) message.value = newMessage
  refBasePopup.value.open()
}

const confirm = () => {
  refBasePopup.value.confirm()
}

defineExpose({ open, confirm })
</script>

<template>
  <base-popup ref="refBasePopup" class="confirm-popup">
    <div class="confirm-popup__container">
      <h1 class="confirm-popup__title">
        <slot name="title"> {{ title }} </slot>
      </h1>
      <p class="confirm-popup__text-message">
        <slot name="message"> {{ message }} </slot>
      </p>
      <slot />
      <div class="confirm-popup__buttons-block">
        <base-button
          :button-style="EnumButtonStyles.secondary"
          :button-size="EnumButtonSizes.middle"
          @click="confirm"
        >
          Cancel
        </base-button>
        <base-button
          :button-style="EnumButtonStyles.primary"
          :button-size="EnumButtonSizes.middle"
          @click="confirm"
        >
          Ok
        </base-button>
      </div>
    </div>
  </base-popup>
</template>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
