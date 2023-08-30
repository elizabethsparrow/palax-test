import { useAxios } from '@/shared/api'
import type { IUser } from '../model/types'

export const getAllUsers = (): Promise<IUser[]> => useAxios.get('/users')
