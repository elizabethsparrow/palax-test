import type { IPost } from '@/entities/post'

export interface IUser {
  id: Number
  name: String
  username?: String
  address?: {
    street?: String
    suite?: String
    city?: String
    zipcode?: String
    geo?: {
      lat?: String
      lng?: String
    }
  }
  email?: String
  phone?: String
  website?: String
  company?: {
    name?: String
    catchPhrase?: String
    bs?: String
  }
  posts: IPost[]
}
