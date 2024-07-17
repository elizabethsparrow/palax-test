import { defineStore } from 'pinia'
import { ref, toRefs, watch } from 'vue'
import {
  getPostsByUser as requestGetPostsByUser,
  editPost as requestEditPost,
  deletePost as requestDeletePost,
  createPost,
  type IPost,
  type IPostCreate
} from '@/entities/post'

export const usePostStore = defineStore('postStore', () => {
  const posts = ref<IPost[]>([])

  const getPostsByUser = async (userId: Number) => {
    setPostStoreToLocalStorage()
    if (getPostsByUserId(userId).length > 0) {
      return
    }
    const response = await requestGetPostsByUser(userId)
    setPostsToState(response)
  }

  const getPostById = (postId?: Number) => {
    if (postId) {
      return posts.value.find((post) => post.id == postId)
    }
    return null
  }

  const setPostsToState = (newPosts: IPost[]): void => {
    newPosts.forEach((post) => {
      const isPostExist = getIsPostExist(post.id)
      if (!isPostExist) posts.value.push(post)
    })
  }
  
  const updatePost = (postData: IPost) => {
    const post: IPost | null | undefined = getPostById(postData.id)
    const postObjectKeys = Object.getOwnPropertyNames(post)
    postObjectKeys.forEach((key) => {
      if (post) post[key] = postData[key]
    })
  }

  const getIsPostExist = (postId: Number): Boolean => {
    return posts.value.map((el) => el.id).includes(postId)
  }

  const createNewPost = async (postData: IPostCreate): Promise<void> => {
    const result: IPost = await createPost(postData)
    if (result) setPostsToState([result])
  }

  const editPost = async (postData: IPost): Promise<void> => {
    const result = await requestEditPost(postData)
    if (result) updatePost(result)
  }

  const getPostsByUserId = (userId: Number) => {
    return [...posts.value].filter((el) => el.userId == userId)
  }

  const deletePost = async (postId: Number) => {
    await requestDeletePost(postId)
    posts.value = [...posts.value].filter((post) => post.id != postId)
  }

  const setPostStoreToLocalStorage = () => {
    const localStoragePosts = localStorage.posts ? JSON.parse(localStorage.posts) : null
    if (posts.value.length <= 0 && localStoragePosts) setPostsToState(localStoragePosts)
  }

  watch(
    () => posts.value,
    () => {
      localStorage.posts = JSON.stringify(posts.value)
    },
    { deep: true }
  )

  return {
    posts,
    getPostsByUser,
    setPostsToState,
    createNewPost,
    getPostsByUserId,
    editPost,
    deletePost
  }
})
