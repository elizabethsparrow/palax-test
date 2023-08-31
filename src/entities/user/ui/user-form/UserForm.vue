<script setup lang="ts">
import { reactive } from 'vue'
import { type IUserCreate } from '@/entities/user'
import InputText from 'primevue/inputtext'

const formData: IUserCreate = reactive({
  name: '',
  userName: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: ''
  },
  email: '',
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: ''
  }
})
</script>

<template>
  <div class="user-form">
    <div class="user-form__input-block">
      <label class="user-form__input-label" for="name"></label>
      <input-text class="user-form__input" id="name" v-model="formData.name" />
      <label class="user-form__input-label" for="username"></label>
      <input-text class="user-form__input" id="username" />
      <label class="user-form__input-label" for=""></label>
      <input-text class="user-form__input" id="" />
      <label class="user-form__input-label" for=""></label>
      <input-text class="user-form__input" id="" />
    </div>
  </div>
</template>

<style scoped></style>
