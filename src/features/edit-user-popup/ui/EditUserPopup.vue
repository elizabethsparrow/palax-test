<script setup lang="ts">
import { BasePopup } from '@/shared/ui-kit/base-popup'
import { UserForm, type IUser } from '@/entities/user'
import { ref, toRefs } from 'vue'

const userData = ref()

const refBasePopup = ref(),
  refUserForm = ref()

const open = (newUserData?: IUser) => {
  if (newUserData) userData.value = newUserData
  refBasePopup.value?.open()
}

defineExpose({
  open,
  confirm: () => refBasePopup.value.confirm(),
  getFormData: () => refUserForm.value?.getFormData()
})
</script>

<template>
  <base-popup ref="refBasePopup" class="edit-user-popup">
    <div class="edit-user-popup__container">
      <h1 class="edit-user-popup__title">
        <slot name="title" />
      </h1>
      <user-form ref="refUserForm" class="edit-user-popup__user-form" :user-data="userData" />
      <div class="edit-user-popup__buttons-block">
        <slot name="buttons-block" />
      </div>
    </div>
  </base-popup>
</template>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
