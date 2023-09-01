<script setup lang="ts">
import { useUserStore } from '@/entities/user'
import { type IPost, usePostStore } from '@/entities/post'
import { UserPostCard } from '@/widgets/user-post-list'
import { BaseButton, EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit/base-button'
import { ConfirmPopup } from '@/features/confirm-popup'
import { EditPostPopup } from '@/features/edit-post-popup'
import { ref, toRefs, type Ref } from 'vue'

const userStore = useUserStore(),
  { getAllUsers } = userStore,
  { users } = toRefs(userStore),
  { editPost, deletePost } = usePostStore(),
  refConfirmPopup = ref(),
  refEditPostPopup = ref(),
  refSaveButton = ref()

const onLoad = () => {
  getAllUsers()
}

const activateConfirm = (title?: String, message?: String) => {
  refConfirmPopup.value.open(title, message)
}

const onClickEditButton = async (post: IPost) => {
  refEditPostPopup.value.open(post)
}

const onClickSaveButton = async () => {
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

const onClickDeleteButton = async (postId: Number, buttonRef?: any) => {
  try {
    console.log(buttonRef)
    buttonRef[0]?.setLoadingStatus(true)
    await deletePost(postId)
  } catch (error: any) {
    activateConfirm('Error!', error.message)
  } finally {
    buttonRef[0]?.setLoadingStatus(false)
  }
}

onLoad()
</script>

<template>
  <div class="user-post-list">
    <edit-post-popup ref="refEditPostPopup">
      <template #title>Edit post</template>
      <template #buttons-block>
        <base-button
          ref="refSaveButton"
          @click="onClickSaveButton"
          :button-style="EnumButtonStyles.primary"
          :button-size="EnumButtonSizes.small"
        >
          Save
        </base-button>
      </template>
    </edit-post-popup>
    <confirm-popup ref="refConfirmPopup"> </confirm-popup>

    <div class="user-post-list__container">
      <user-post-card
        class="user-post-list__user-post-card"
        v-for="user in users"
        :key="user.id.toString()"
        :user="user"
      >
        <template v-slot:default="{ post }">
          <base-button
            :button-style="EnumButtonStyles.primary"
            :button-size="EnumButtonSizes.small"
            @click="onClickEditButton(post)"
          >
            Edit
          </base-button>
          <base-button
            :ref="`refDeleteButton${post.id}`"
            :button-style="EnumButtonStyles.primary"
            :button-size="EnumButtonSizes.small"
            @click="onClickDeleteButton(post.id, $refs[`refDeleteButton${post.id}`])"
          >
            Delete
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
