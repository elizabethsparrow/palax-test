<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app__container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import '@/shared/styles/main.scss';

#app {
  width: 100vw;
  min-height: 100vh;
}

.app__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: $mainBackground;
}
</style>
