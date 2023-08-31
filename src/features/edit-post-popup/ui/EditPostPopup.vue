<script setup lang="ts">
import { PostForm, type IPostCreate, type IPost } from '@/entities/post'
import { BasePopup } from '@/shared/ui-kit/base-popup'
import { BaseButton, EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit/base-button'
import { ref } from 'vue'

const refBasePopup = ref(),
  refPostForm = ref(),
  postData = ref<IPostCreate | IPost>({})

const open = (newPostData?: IPost): void => {
  if (newPostData) postData.value = newPostData
  refBasePopup.value.open()
}

const getFormData = () => {
  const formData = refPostForm.value.getFormData()
  if (formData) return { ...postData.value, ...refPostForm.value.getFormData() }
}

const close = () => refBasePopup.value.close()

defineExpose({
  open,
  confirm: () => refBasePopup.value.confirm(),
  close,
  getFormData
})
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
