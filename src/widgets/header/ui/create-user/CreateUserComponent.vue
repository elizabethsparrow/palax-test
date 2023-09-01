<script setup lang="ts">
import { BaseButton, EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit'
import { EditUserPopup } from '@/features/edit-user-popup'
import { ConfirmPopup } from '@/features/confirm-popup'
import { useUserStore } from '@/entities/user'
import { ref } from 'vue'

const refEditUserPopup = ref(),
  refConfirmPopup = ref(),
  refCreateButton = ref(),
  { createUser } = useUserStore()

const onClickActivateButton = () => refEditUserPopup.value?.open()

const onClickCreateButton = async () => {
  try {
    refCreateButton.value.setLoadingStatus(true)
    const formData = refEditUserPopup.value?.getFormData()
    if (!formData) return
    await createUser(formData)
    refEditUserPopup.value.confirm()
    refConfirmPopup.value.open('Success!', 'User created successfully')
  } catch (error: any) {
    refConfirmPopup.value.open('Error!', error.message)
  } finally {
    refCreateButton.value.setLoadingStatus(false)
  }
}
</script>

<template>
  <div class="create-user-component">
    <edit-user-popup ref="refEditUserPopup">
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
    </edit-user-popup>
    <confirm-popup ref="refConfirmPopup"> </confirm-popup>

    <base-button
      @click="onClickActivateButton"
      :button-size="EnumButtonSizes.middle"
      :button-style="EnumButtonStyles.primary"
    >
      Create User
    </base-button>
  </div>
</template>

<style lang="scss" scoped></style>
