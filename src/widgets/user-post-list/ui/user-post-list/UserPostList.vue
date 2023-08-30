<script setup lang="ts">
import { useUserStore } from '@/entities/user'
import { UserPostCard } from '@/widgets/user-post-list'
import { BaseButton, EnumButtonSizes, EnumButtonStyles } from '@/shared/ui-kit/base-button'
import { ConfirmPopup } from '@/features/confirm-popup'
import { EditPostPopup } from '@/features/edit-post-popup'
import { ref, toRefs } from 'vue'
import type { IPost } from '@/entities/post'

const userStore = useUserStore(),
  { getAllUsers } = userStore,
  { users } = toRefs(userStore),
  refConfirmPopup = ref(),
  refEditPostPopup = ref()

const onLoad = () => {
  getAllUsers()
}

const activateConfirm = (title?: String, message?: String) => {
  refConfirmPopup.value.open(title, message)
}

const onClickEditButton = async (post: IPost) => {
  refEditPostPopup.value.open(post)
}

const onClickSaveButton = () => {
  const result = refEditPostPopup.value.confirm()

  if (result) {
    activateConfirm('Success!', 'Post successfully edited')
  }
}

onLoad()
</script>

<template>
  <div class="user-post-list">
    <confirm-popup ref="refConfirmPopup"> </confirm-popup>
    <edit-post-popup ref="refEditPostPopup">
      <template #title>Edit post</template>
      <template #buttons-block>
        <base-button
          @click="onClickSaveButton"
          :button-style="EnumButtonStyles.primary"
          :button-size="EnumButtonSizes.small"
        >
          Save
        </base-button>
      </template>
    </edit-post-popup>
    <div class="user-post-list__container">
      <user-post-card
        class="user-post-list__user-post-card"
        v-for="user in users"
        :key="user.id.toString()"
        :user="user"
      >
        <template v-slot:default="{ post }">
          <base-button
            :button-style="EnumButtonStyles.primary"
            :button-size="EnumButtonSizes.small"
            @click="onClickEditButton(post)"
          >
            Edit
          </base-button>
        </template>
      </user-post-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-post-list {
  &__container {
    gap: 30px;
  }
  &__user-post-card {
    margin: 12px 0;
  }
}
</style>
@/features/user-post-card @/widgets/user-post-list/ui/user-post-card
