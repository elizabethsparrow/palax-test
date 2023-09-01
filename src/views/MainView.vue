<script setup lang="ts">
import { UserPostList } from '@/widgets/user-post-list'
import { HeaderComponent } from '@/widgets/header'
</script>

<template>
  <div class="main-page">
    <header-component class="main-page__header" />
    <div class="main-page__container">
      <user-post-list class="main-page__user-post-list" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  &__container {
    max-height: calc(100vh - 70px);
    overflow: auto;
  }

  &__user-post-list {
    padding: 6px;
  }

  &__header {
    position: sticky;
    z-index: 1;
    top: 0;
  }
}
</style>
