import { useUserStore } from '@/entities/user'
import { defineStore } from 'pinia'
import { toRefs } from 'vue'
import { getPostsByUser as requestGetPostsByUser, type IPost } from '@/entities/post'

export const usePostStore = defineStore('postStore', () => {
  const userStore = useUserStore(),
    { getUserById } = userStore,
    { users } = toRefs(userStore)

  const getPostsByUser = async (userId: Number) => {
    const response = await requestGetPostsByUser(userId)
    setPostsToUserState(userId, response)
  }

  const setPostsToUserState = (userId: Number, posts: IPost[]) => {
    const user = getUserById(userId)
    if (user && !user.posts) user.posts = []
    if (user?.posts) {
      posts.forEach((post) => {
        let isPostExist = getIsPostExist(user.posts, post.id)
        if (!isPostExist) user.posts.push(post)
      })
    }
  }

  const getIsPostExist = (posts: IPost[], postId: Number) => {
    return posts?.map((el) => el.id).includes(postId)
  }

  return { getPostsByUser, setPostsToUserState }
})
