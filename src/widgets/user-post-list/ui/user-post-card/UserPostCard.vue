<script setup lang="ts">
import { type IUser, UserCard, useUserStore } from '@/entities/user'
import { usePostStore, PostCard } from '@/entities/post'
import { ref, computed, toRefs, watch, type Ref } from 'vue'
import { BaseButton, EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit'
import { EditUserPopup } from '@/features/edit-user-popup'
import { ConfirmPopup } from '@/features/confirm-popup'

const props = defineProps<{
    user: IUser
  }>(),
  { user } = toRefs(props)

const { getPostsByUser, getPostsByUserId } = usePostStore(),
  { editUser, deleteUser } = useUserStore(),
  showPosts = ref<Boolean>(false),
  posts = computed(() => getPostsByUserId(user.value.id)),
  refEditUserPopup = ref(),
  refSaveButton = ref(),
  refConfirmPopup = ref()

const onClickUserCard = (userId: Number) => {
  if (!showPosts.value) getPostsByUser(userId)
  showPosts.value = !showPosts.value
}

const onClickEditActivateButton = (user: IUser) => refEditUserPopup.value.open(user)

const onClickSaveButton = async () => {
  try {
    refSaveButton.value.setLoadingStatus(true)
    const formData = refEditUserPopup.value.getFormData()
    if (!formData) return
    await editUser({ ...formData, id: user.value.id })
    refEditUserPopup.value.confirm()
    refConfirmPopup.value.open('Success!', 'User updated successfully')
  } catch (error: any) {
    refConfirmPopup.value.open('Error!', error.message)
  } finally {
    refSaveButton.value.setLoadingStatus(false)
  }
}

const onClickDeleteButton = async (userId: Number, refButton: any) => {
  try {
    console.log(refButton)

    refButton?.setLoadingStatus(true)
    await deleteUser(userId)
  } catch (error: any) {
    console.log(error)
    refConfirmPopup.value.open('Error!', error.message)
  } finally {
    refButton?.setLoadingStatus(false)
  }
}

watch(
  () => posts.value,
  () => {
    if (posts.value.length <= 0) {
      showPosts.value = false
    }
  }
)
</script>

<template>
  <div class="user-post-card">
    <edit-user-popup ref="refEditUserPopup" class="user-post-card__edit-user-popup">
      <template #title>Edit User</template>
      <template #buttons-block>
        <base-button
          ref="refSaveButton"
          @click="onClickSaveButton"
          :button-size="EnumButtonSizes.middle"
          :button-style="EnumButtonStyles.primary"
        >
          Save
        </base-button>
      </template>
    </edit-user-popup>
    <confirm-popup ref="refConfirmPopup"> </confirm-popup>
    <user-card
      class="user-post-card__user-card"
      :key="user.id.toString()"
      :user="user"
      @click="onClickUserCard(user.id)"
    >
      <template #buttons-block>
        <base-button
          @click.stop="onClickEditActivateButton(user)"
          :button-size="EnumButtonSizes.small"
          :button-style="EnumButtonStyles.primary"
        >
          Edit
        </base-button>
        <base-button
          ref="refDeleteButton"
          @click.stop="onClickDeleteButton(user.id, $refs.refDeleteButton)"
          :button-size="EnumButtonSizes.small"
          :button-style="EnumButtonStyles.primary"
        >
          Delete
        </base-button>
      </template>
    </user-card>
    <div class="user-post-card__post-container" v-if="showPosts">
      <post-card v-for="post in posts" :key="post.id.toString()" :post="post">
        <template #bottom-block>
          <slot :post="post" />
        </template>
      </post-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-post-card {
  display: flex;
  gap: 12px;

  &__user-card {
    position: sticky;
    top: 0;
    width: 30%;
    height: fit-content;
  }
  &__post-container {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
