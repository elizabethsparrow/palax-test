<script setup lang="ts">
import { PostForm, type IPostCreate, type IPost } from '@/entities/post'
import { BasePopup } from '@/shared/ui-kit/base-popup'
import { BaseButton, EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit/base-button'
import { ref } from 'vue'

const refBasePopup = ref(),
  refPostForm = ref(),
  postData = ref<IPostCreate | IPost>({})

const open = (newPostData: IPostCreate | IPost): void => {
  postData.value = newPostData
  refBasePopup.value.open()
}

const confirm = (): IPostCreate | IPost | null => {
  const formData = refPostForm.value.getFormData()
  if (!formData) return null
  refBasePopup.value.confirm()
  return formData
}

const close = () => {
  refBasePopup.value.close()
}

defineExpose({ open, confirm, close })
</script>

<template>
  <base-popup class="edit-post-popup" ref="refBasePopup">
    <h1 class="edit-post-popup__title"><slot name="title" /></h1>
    <post-form class="edit-post-popup__post-form" ref="refPostForm" :post-data="postData" />
    <div class="edit-post-popup__buttons-block">
      <base-button
        @click="close"
        :button-size="EnumButtonSizes.middle"
        :button-style="EnumButtonStyles.secondary"
      >
        Cancel
      </base-button>
      <slot name="buttons-block" />
    </div>
  </base-popup>
</template>

<style scoped lsng="scss">
@import './style.module.scss';
</style>
