<script setup lang="ts">
import type { IUser } from '@/entities/user'

defineProps<{ user: IUser }>()
</script>

<template>
  <div class="user-card">
    <div class="user-card__container">
      <p class="user-card__text user-card__name">
        {{ user.name }}
      </p>
      <p class="user-card__text user-card__email">
        Email: <span class="user-card__email_italic">{{ user.email }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-card {
  padding: 12px;
  border-radius: 8px;
  background: $white;

  &__container {
  }

  &__text {
    line-height: 1.5;
  }

  &__name {
    font-weight: 700;
  }

  &__email {
    &_italic {
      font-style: italic;
    }
  }
}
</style>
