<script setup lang="ts">
import { type IPost } from '../../index'

defineProps<{ post: IPost }>()
</script>

<template>
  <div class="post-card">
    <div class="post-card__container">
      <p class="post-card__title">{{ post.title }}</p>
      <p class="post-card__body">{{ post.body }}</p>
      <div class="post-card__buttons-block">
        <slot name="bottom-block" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-card {
  background: $white;
  border-radius: 8px;
  padding: 12px;
  line-height: 1.5;

  &__container {
  }
  &__title {
    font-weight: 700;
  }

  &__buttons-block {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
