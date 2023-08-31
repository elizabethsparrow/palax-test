<script setup lang="ts">
import { UserPostList } from '@/widgets/user-post-list'
import { HeaderComponent } from '@/widgets/header'
</script>

<template>
  <div class="main-page">
    <header-component />
    <user-post-list class="user-post-list" />
  </div>
</template>

<style lang="scss" scoped>
.user-post-list {
  padding: 6px;
}
</style>
