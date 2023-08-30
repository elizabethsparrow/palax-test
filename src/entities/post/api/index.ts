import { useAxios } from '@/shared/api'
import type { IPost } from '../model'

export const getPostsByUser = (userId: Number): Promise<IPost[]> =>
  useAxios.get(`/posts?userId=${userId}`)
