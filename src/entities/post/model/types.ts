export interface IPost {
  userId?: Number | null
  id: Number
  title?: String | null
  body?: String | null
  [key: string]: any
}

export interface IPostCreate extends Omit<IPost, 'id'> {}
