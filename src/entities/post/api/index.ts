import { useAxios } from '@/shared/api'
import type { IPost, IPostCreate } from '../model'

export const getPostsByUser = (userId: Number): Promise<IPost[]> =>
  useAxios.get(`/posts?userId=${userId}`)

export const editPost = (postData: IPost): Promise<IPost> =>
  useAxios.put(`/posts/${postData.id}`, postData)

export const createPost = (postData: IPostCreate): Promise<IPost> =>
  useAxios.post('/posts', postData)

export const deletePost = (postId: Number) => useAxios.delete(`/posts/${postId}`)
