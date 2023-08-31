<script setup lang="ts">
import { reactive, toRefs, watch, type Ref, ref } from 'vue'
import { type IPostCreate, type IPost } from '@/entities/post'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { useUserStore, type IUser } from '@/entities/user'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const props = defineProps<{
    postData?: IPostCreate | IPost
  }>(),
  { postData } = toRefs(props),
  error = ref<{ status: Boolean; message: String }>({ status: false, message: '' })

const formData: IPostCreate = reactive({
  userId: 0,
  title: '',
  body: ''
})

const rules = {
  userId: { required },
  title: { required },
  body: { required }
}

const v$ = useVuelidate<IPostCreate>(rules, formData)

const userStore = useUserStore(),
  { users } = toRefs(userStore)

const setFormData = () => {
  const postDataObjectKeys: string[] = Object.getOwnPropertyNames(formData)
  postDataObjectKeys.forEach((key) => {
    if (postData && postData.value) {
      formData[key] = postData.value[key]
    }
  })
}

const getFormData = (): IPostCreate | null => {
  error.value.status = false

  if (v$.value.$invalid) {
    v$.value.$touch()
    error.value.status = true
    error.value.message = 'Fill in all the fields'
    return null
  }
  return formData
}

watch(
  () => postData?.value,
  () => {
    setFormData()
  },
  { immediate: true }
)

defineExpose({ getFormData })
</script>

<template>
  <div class="post-form">
    <div class="post-form__container">
      <div class="post-form__input-block">
        <label for="user">User</label>
        <Dropdown
          id="user"
          class="post-form__input post-form__dropdown"
          :class="{ 'p-invalid': v$.userId.$invalid && v$.userId.$dirty }"
          v-model="formData.userId"
          :options="users"
          :optionValue="(val) => val.id"
          optionLabel="name"
          placeholder="Select a User"
        />
      </div>

      <div class="post-form__input-block">
        <label for="title">Title</label>
        <input-text
          id="title"
          class="post-form__input post-form__input-title"
          :class="{ 'p-invalid': v$.title.$invalid && v$.title.$dirty }"
          v-model="formData.title"
        />
      </div>
      <div class="post-form__input-block">
        <label for="body">Body</label>
        <input-text
          id="body"
          class="post-form__input post-form__input-body"
          :class="{ 'p-invalid': v$.body.$invalid && v$.body.$dirty }"
          v-model="formData.body"
        />
      </div>
      <p class="post-form__error-message" v-if="error.status">{{ error.message }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.module.scss';
</style>
