<script setup lang="ts">
import { UserPostList } from '@/widgets/user-post-list'
import { ref } from 'vue'
</script>

<template>
  <div class="main-page">
    <user-post-list class="user-post-list" />
  </div>
</template>

<style lang="scss" scoped>
.user-post-list {
  padding: 6px;
}
</style>
