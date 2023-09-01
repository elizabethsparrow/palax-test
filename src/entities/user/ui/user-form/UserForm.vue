<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue'
import { type IUserCreate, type IUser } from '@/entities/user'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'

const props = defineProps<{ userData?: IUser | IUserCreate }>(),
  { userData } = toRefs(props)

const formData: IUserCreate = reactive({
  name: null,
  username: null,
  address: {
    street: null,
    city: null
  },
  email: null,
  phone: null
})
const validateRules = {
  name: { required },
  username: { required },
  email: { required, email }
}
const v$ = useVuelidate<IUserCreate>(validateRules, formData)

const setFormData = () => {
  const postDataObjectKeys: string[] = Object.getOwnPropertyNames(formData)
  postDataObjectKeys.forEach((key) => {
    if (userData && userData.value) {
      formData[key] = userData.value[key]
    }
  })
}

const getFormData = (): IUserCreate | null => {
  if (v$.value.$invalid) {
    v$.value.$touch()
    return null
  }
  return formData
}

watch(
  () => userData?.value,
  () => {
    setFormData()
  },
  { immediate: true }
)

defineExpose({ getFormData })
</script>

<template>
  <div class="user-form form">
    <div class="user-form__input-block form__input-block">
      <label class="user-form__input-label form__input-label form__input-label_required" for="name">
        Name
      </label>
      <input-text
        class="user-form__input form__input"
        :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty }"
        id="name"
        v-model="formData.name"
      />
    </div>
    <div class="user-form__input-block form__input-block">
      <label
        class="user-form__input-label form__input-label form__input-label_required"
        for="username"
      >
        Username
      </label>
      <input-text
        class="user-form__input form__input"
        :class="{ 'p-invalid': v$.username.$invalid && v$.username.$dirty }"
        id="username"
        v-model="formData.username"
      />
    </div>
    <div class="user-form__input-block form__input-block">
      <label
        class="user-form__input-label form__input-label form__input-label_required"
        for="email"
      >
        Email
      </label>
      <input-text
        class="user-form__input form__input"
        :class="{ 'p-invalid': v$.email.$invalid && v$.email.$dirty }"
        id="email"
        v-model="formData.email"
      />
    </div>
    <div class="user-form__input-block form__input-block">
      <label class="user-form__input-label form__input-label" for="phone">Phone</label>
      <input-mask
        mask="9-999-999-99-99"
        class="user-form__input form__input"
        id="phone"
        v-model="formData.phone"
      />
    </div>
    <div class="user-form__input-block form__input-block">
      <label class="user-form__input-label form__input-label" for="city">City</label>
      <input-text class="user-form__input form__input" id="city" v-model="formData.address.city" />
    </div>
    <div class="user-form__input-block form__input-block">
      <label class="user-form__input-label form__input-label" for="street">Street</label>
      <input-text
        class="user-form__input form__input"
        id="street"
        v-model="formData.address.street"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/shared/styles/form-styles.scss';
</style>
