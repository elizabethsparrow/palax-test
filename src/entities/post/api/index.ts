import { useAxios } from '@/shared/api'
import type { IPost, IPostCreate } from '../model'

export const getPostsByUser = (userId: Number): Promise<IPost[]> =>
  useAxios.get(`/posts?userId=${userId}`)

export const editPost = (postData: IPost | IPostCreate) =>
  useAxios.put(`/posts/${postData.id}`, postData)
