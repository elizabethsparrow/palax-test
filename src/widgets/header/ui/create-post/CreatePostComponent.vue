<script setup lang="ts">
import { BaseButton, EnumButtonStyles, EnumButtonSizes } from '@/shared/ui-kit'
import { EditPostPopup } from '@/features/edit-post-popup'
import { ConfirmPopup } from '@/features/confirm-popup'
import { usePostStore } from '@/entities/post'
import { ref } from 'vue'

const refEditPostPopup = ref(),
  refConfirmPopup = ref(),
  refCreateButton = ref()

const { createNewPost } = usePostStore()

const onClickActivateButton = () => {
  refEditPostPopup.value.open()
}

const onClickCreateButton = async () => {
  try {
    refCreateButton.value.setLoadingStatus(true)
    const formData = refEditPostPopup.value.getFormData()
    if (formData) {
      await createNewPost(formData)
      refEditPostPopup.value.confirm()
      refConfirmPopup.value.open('Success!', 'Post created successfully!')
      return
    }
  } catch (error: any) {
    refConfirmPopup.value.open('Error!', error.message)
  } finally {
    refCreateButton.value.setLoadingStatus(false)
  }
}
</script>

<template>
  <div class="create-post-component">
    <base-button
      @click="onClickActivateButton"
      :button-size="EnumButtonSizes.middle"
      :button-style="EnumButtonStyles.primary"
    >
      Create Post
    </base-button>
    <edit-post-popup ref="refEditPostPopup">
      <template #title> Create post </template>
      <template #buttons-block>
        <base-button
          ref="refCreateButton"
          @click="onClickCreateButton"
          :button-size="EnumButtonSizes.middle"
          :button-style="EnumButtonStyles.primary"
        >
          Create
        </base-button>
      </template>
    </edit-post-popup>
    <confirm-popup ref="refConfirmPopup"> </confirm-popup>
  </div>
</template>

<style scoped></style>
