import { defineStore } from 'pinia'
import { ref } from 'vue'
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

  const setUsers = (users: IUser[]) => {
    users.forEach((user) => setUser(user))
  }

  const getUserById = (userId: Number): IUser | null | undefined => {
    const user = users.value.find((user) => user.id === userId)
    return user
  }

  return { users, getAllUsers, getUserById }
})
