<script setup lang="ts">
import { UserPostList } from '@/widgets/user-post-list'
import { CreatePostComponent } from '@/widgets/create-post'
</script>

<template>
  <div class="main-page">
    <create-post-component />
    <user-post-list class="user-post-list" />
  </div>
</template>

<style lang="scss" scoped>
.user-post-list {
  padding: 6px;
}
</style>
