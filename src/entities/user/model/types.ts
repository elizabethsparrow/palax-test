import type { IPost } from '@/entities/post'

export interface IUser {
  id: Number
  name?: String | null
  username?: String | null
  address?: {
    street?: String | null
    suite?: String | null
    city?: String | null
    zipcode?: String | null
    geo?: {
      lat?: String | null
      lng?: String | null
    }
  }
  email?: String | null
  phone?: String | null
  website?: String | null
  company?: {
    name?: String | null
    catchPhrase?: String | null
    bs?: String | null
  }
}

export interface IUserCreate extends Omit<IUser, 'id'> {}
