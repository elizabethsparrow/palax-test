<script setup lang="ts">
import { useUserStore, type IUser } from '@/entities/user'
import { type IPost, usePostStore } from '@/entities/post'
import { UserPostCard } from '@/widgets/user-post-list'
import { BaseButton, EnumButtonSizes, EnumButtonStyles, TrashIcon, EditIcon } from '@/shared/ui-kit'
import { ConfirmPopup } from '@/features/confirm-popup'
import { EditPostPopup } from '@/features/edit-post-popup'
import { EditUserPopup } from '@/features/edit-user-popup'
import { ref, toRefs, type Ref } from 'vue'

const userStore = useUserStore(),
  { getAllUsers, editUser, deleteUser } = userStore,
  { users } = toRefs(userStore),
  { editPost, deletePost } = usePostStore(),
  refConfirmPopup = ref(),
  refEditPostPopup = ref(),
  refEditUserPopup = ref(),
  refSaveButton = ref()

const onLoad = () => {
  getAllUsers()
}

const activateConfirm = (title?: String, message?: String) => {
  refConfirmPopup.value.open(title, message)
}

const onClickPostEditButton = async (post: IPost) => {
  refEditPostPopup.value.open(post)
}

const onClickUserEditButton = (user: IUser) => refEditUserPopup.value.open(user)

const onClickPostSaveButton = async () => {
  try {
    refSaveButton?.value?.setLoadingStatus(true)
    const result: IPost = refEditPostPopup.value.getFormData()
    if (result) {
      console.log(result)

      await editPost(result)
      refEditPostPopup.value.confirm()
      activateConfirm('Success!', 'Post successfully edited')
      return
    }
    throw { message: 'Sorry:(' }
  } catch (error: any) {
    console.log(error)

    activateConfirm('Error!', error.message)
  } finally {
    refSaveButton?.value?.setLoadingStatus(false)
  }
}

const onClickUserSaveButton = async () => {
  try {
    refSaveButton.value.setLoadingStatus(true)
    const formData = refEditUserPopup.value.getFormData()
    if (!formData) return
    await editUser(formData)
    refEditUserPopup.value.confirm()
    refConfirmPopup.value.open('Success!', 'User updated successfully')
  } catch (error: any) {
    refConfirmPopup.value.open('Error!', error.message)
  } finally {
    refSaveButton.value.setLoadingStatus(false)
  }
}

const onClickPostDeleteButton = (postId: Number, buttonRef?: any) => {
  try {
    console.log(buttonRef)
    buttonRef[0]?.setLoadingStatus(true)
    deletePost(postId)
  } catch (error: any) {
    activateConfirm('Error!', error.message)
  } finally {
    buttonRef[0]?.setLoadingStatus(false)
  }
}

const onClickUserDeleteButton = async (userId: Number, refButton: any) => {
  try {
    console.log(refButton)
    refButton[0]?.setLoadingStatus(true)
    await deleteUser(userId)
  } catch (error: any) {
    console.log(error)
    refConfirmPopup.value.open('Error!', error.message)
  } finally {
    refButton[0]?.setLoadingStatus(false)
  }
}

onLoad()
</script>

<template>
  <div class="user-post-list">
    <!-- EDIT POST POUP -->
    <edit-post-popup ref="refEditPostPopup">
      <template #title>Edit post</template>
      <template #buttons-block>
        <base-button
          ref="refSaveButton"
          @click="onClickPostSaveButton"
          :button-style="EnumButtonStyles.primary"
          :button-size="EnumButtonSizes.small"
        >
          Save
        </base-button>
      </template>
    </edit-post-popup>

    <!-- EDIT USER POUP -->
    <edit-user-popup ref="refEditUserPopup" class="user-post-card__edit-user-popup">
      <template #title>Edit User</template>
      <template #buttons-block>
        <base-button
          ref="refSaveButton"
          @click="onClickUserSaveButton"
          :button-size="EnumButtonSizes.middle"
          :button-style="EnumButtonStyles.primary"
        >
          Save
        </base-button>
      </template>
    </edit-user-popup>

    <!-- CONFIRM POPUP -->
    <confirm-popup ref="refConfirmPopup"> </confirm-popup>

    <div class="user-post-list__container">
      <user-post-card
        class="user-post-list__user-post-card"
        v-for="(user, i) in users"
        :key="user.id.toString()"
        :user="user"
      >
        <template #user-buttons-block>
          <base-button
            @click.stop="onClickUserEditButton(user)"
            :button-size="EnumButtonSizes.small"
            :button-style="EnumButtonStyles.primary"
          >
            <edit-icon title="edit user" width="15px" height="15px" />
          </base-button>
          <base-button
            :ref="`refDeleteButton${i}`"
            @click.stop="onClickUserDeleteButton(user.id, $refs[`refDeleteButton${i}`])"
            :button-size="EnumButtonSizes.small"
            :button-style="EnumButtonStyles.primary"
          >
            <trash-icon title="delete user" width="15px" height="15px" />
          </base-button>
        </template>

        <template v-slot:post-buttons-block="{ post }">
          <base-button
            :button-style="EnumButtonStyles.primary"
            :button-size="EnumButtonSizes.small"
            @click="onClickPostEditButton(post)"
          >
            <edit-icon width="15px" height="15px" />
          </base-button>
          <base-button
            :ref="`refDeleteButton${post.id}`"
            :button-style="EnumButtonStyles.primary"
            :button-size="EnumButtonSizes.small"
            @click="onClickPostDeleteButton(post.id, $refs[`refDeleteButton${post.id}`])"
          >
            <trash-icon width="15px" height="15px" />
          </base-button>
        </template>
      </user-post-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-post-list {
  &__container {
    gap: 30px;
  }
  &__user-post-card {
    margin: 12px 0;
  }
}
</style>
@/features/user-post-card @/widgets/user-post-list/ui/user-post-card
