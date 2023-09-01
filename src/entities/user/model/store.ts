import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { IUser, IUserCreate } from './types'
import {
  getAllUsers as requestGetAllUsers,
  createUser as requestCreateUser,
  editUser as requestEditUser,
  deleteUser as requestDeleteUser
} from '../index'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<IUser[]>([])

  const updateUser = (userData: IUser) => {
    const user = getUserById(userData.id)
    if (!user) return
    const userDataObjectKeys = Object.getOwnPropertyNames(userData)
    userDataObjectKeys.forEach((key) => {
      user[key] = userData[key]
    })
  }

  const removeUserFromStore = (userId: Number) => {
    users.value = [...users.value].filter((user) => user.id != userId)
  }

  const setUser = (user: IUser) => {
    if (!users.value.includes(user)) {
      users.value.push(user)
    }
  }

  const setUsers = (newUsers: IUser[]) => {
    if (users.value.length <= 0) newUsers.forEach((user) => setUser({ ...user, posts: [] }))
  }

  const getUserById = (userId: Number): IUser | null | undefined => {
    const user = users.value.find((user) => user.id === userId)
    return user
  }

  const getAllUsers = async () => {
    const response = await requestGetAllUsers()
    console.log(response)
    setUsers(response)
  }

  const createUser = async (userData: IUserCreate): Promise<void> => {
    const result = await requestCreateUser(userData)
    if (!result) return
    setUser(result)
  }

  const editUser = async (userData: IUser) => {
    let result: IUser = await requestEditUser(userData)
    updateUser(result)
  }

  const deleteUser = async (userId: Number): Promise<void> => {
    await requestDeleteUser(userId)
    removeUserFromStore(userId)
  }

  watch(
    () => users.value,
    () => {
      localStorage.users = JSON.stringify(users.value)
      const localStorageUsers = localStorage.users ? JSON.parse(localStorage.users) : null
      if (users.value.length <= 0 && localStorageUsers) setUsers(localStorageUsers)
    },
    { immediate: true, deep: true }
  )

  return { users, getAllUsers, getUserById, createUser, updateUser, editUser, deleteUser }
})
