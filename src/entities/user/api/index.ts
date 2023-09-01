import { useAxios } from '@/shared/api'
import type { IUser, IUserCreate } from '../model/types'

export const getAllUsers = (): Promise<IUser[]> => useAxios.get('/users')

export const createUser = (userData: IUserCreate): Promise<IUser> =>
  useAxios.post('/users', userData)

export const editUser = (userData: IUser): Promise<IUser> =>
  useAxios.put(`/users/${userData.id}`, userData)

export const deleteUser = (userId: Number): Promise<IUser> => useAxios.delete(`/users/${userId}`)
