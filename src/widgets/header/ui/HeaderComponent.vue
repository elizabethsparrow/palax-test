<script setup lang="ts">
import { CreatePostComponent, CreateUserComponent } from '../index'
</script>

<template>
  <header class="header-component">
    <div class="header-component__container">
      <create-post-component class="header-component__create-post-component" />
      <create-user-component class="header-component__create-user-component" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-component {
  padding: 12px;
  background: $white;

  &__container {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
