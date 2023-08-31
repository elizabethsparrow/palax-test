import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { IUser } from './types'
import { getAllUsers as requestGetAllUsers } from '../index'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<IUser[]>([])

  const getAllUsers = async () => {
    const response = await requestGetAllUsers()
    console.log(response)
    setUsers(response)
  }

  const setUser = (user: IUser) => {
    users.value.push(user)
  }

  const setUsers = (newUsers: IUser[]) => {
    if (users.value.length <= 0) newUsers.forEach((user) => setUser({ ...user, posts: [] }))
  }

  const getUserById = (userId: Number): IUser | null | undefined => {
    const user = users.value.find((user) => user.id === userId)
    return user
  }

  watch(
    () => users.value,
    () => {
      localStorage.users = JSON.stringify(users.value)
    },
    { immediate: true, deep: true }
  )

  return { users, getAllUsers, getUserById }
})
