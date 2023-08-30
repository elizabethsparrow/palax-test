<script setup lang="ts">
import { useUserStore, type IUser, UserCard } from '@/entities/user'
import { usePostStore, PostCard } from '@/entities/post'
import { ref } from 'vue'

defineProps<{
  user: IUser
}>()

const { getPostsByUser } = usePostStore(),
  showPosts = ref<Boolean>(false)

const onClickUserCard = (userId: Number) => {
  if (!showPosts.value) getPostsByUser(userId)
  showPosts.value = !showPosts.value
}
</script>

<template>
  <div class="user-post-card">
    <user-card
      class="user-post-card__user-card"
      :key="user.id.toString()"
      :user="user"
      @click="onClickUserCard(user.id)"
    />
    <div class="user-post-card__post-container" v-if="showPosts">
      <post-card v-for="post in user?.posts" :key="post.id.toString()" :post="post">
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
