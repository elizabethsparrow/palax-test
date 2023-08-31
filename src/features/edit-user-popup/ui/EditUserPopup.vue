<script setup lang="ts">
import { BasePopup } from '@/shared/ui-kit/base-popup'
import { UserForm } from '@/entities/user'
import { ref } from 'vue'

const refBasePopup = ref()
</script>

<template>
  <base-popup ref="refBasePopup" class="edit-user-popup">
    <h1 class="edit-user-popup__title"><slot name="title" /></h1>
    <user-form class="edit-user-popup__user-form" />
    <div class="edit-user-popup__buttons-block">
      <slot name="buttons-block" />
    </div>
  </base-popup>
</template>

<style lang="scss" scoped></style>
