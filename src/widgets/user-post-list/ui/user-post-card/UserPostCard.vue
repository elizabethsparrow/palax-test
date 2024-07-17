<script setup lang="ts">
import { type IUser, UserCard, useUserStore } from '@/entities/user'
import { usePostStore, PostCard } from '@/entities/post'
import { ref, computed, toRefs, watch, type Ref } from 'vue'
import { BaseButton, EnumButtonSizes, EnumButtonStyles, TrashIcon, EditIcon } from '@/shared/ui-kit'
import { EditUserPopup } from '@/features/edit-user-popup'
import { ConfirmPopup } from '@/features/confirm-popup'

const props = defineProps<{
  user: IUser
}>(),
  { user } = toRefs(props)

const { getPostsByUser, getPostsByUserId } = usePostStore(),
  { editUser, deleteUser } = useUserStore(),
  showPosts = ref<Boolean>(false),
  isPostsLoading = ref<Boolean>(false),
  posts = computed(() => getPostsByUserId(user.value.id)),
  refEditUserPopup = ref(),
  refSaveButton = ref(),
  refConfirmPopup = ref()

const onClickUserCard = async (userId: Number) => {
  try {
    isPostsLoading.value = true
    if (!showPosts.value) await getPostsByUser(userId)
    showPosts.value = !showPosts.value
  } finally {
    isPostsLoading.value = false
  }
}

const onClickDeleteButton = async (userId: Number, refButton: any) => {
  try {
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
    <confirm-popup ref="refConfirmPopup"> </confirm-popup>
    <user-card class="user-post-card__user-card" :key="user.id.toString()" :user="user"
      @click="onClickUserCard(user.id)">
      <template #buttons-block>
        <slot name="user-buttons-block" />
      </template>
    </user-card>
    <div class="user-post-card__post-container" v-if="showPosts">
      <post-card v-for="post in posts" :key="post.id.toString()" :post="post">
        <template #bottom-block>
          <slot name="post-buttons-block" :post="post" />
        </template>
      </post-card>
      <p v-if="posts.length <= 0">Posts not found</p>
    </div>
    <p v-if="isPostsLoading">Loading ...</p>
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
