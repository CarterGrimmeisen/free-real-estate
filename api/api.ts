// This is the api definition file,
// learn more about it in the docs: https://git.io/Jt0RF

import { Agent, Home, Feedback, School, Showing, User } from '@prisma/client'
import { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Success = { success: true }
type Liked = { liked: boolean }

type CompleteHome = Home & { schools: School[] }
type CompleteShowing = Showing & { user: User; agent: Agent }
type CompleteFeedback = Feedback & { showing: Showing }

type CreateHome = Omit<CompleteHome, 'agentId' | 'likeCount' | 'dailyHits'>
type UpdateHome = Partial<Omit<CreateHome, 'mlsn'>>
type CreateShowing = Pick<Showing, 'homeMlsn' | 'date'> & {
  date: string
}
type UpdateShowing = Pick<Showing, 'confirmed'>
type CreateUser = Omit<User, 'id' | 'type'> & { password: string }
type UpdateUser = Partial<CreateUser>
type CreateFeedback = Omit<Feedback, 'id' | 'showingId'>

export default interface API {
  '/auth/login': {
    /**
     * Login via email/password and fetch authentication cookie
     */
    post: Endpoint<{ email: string; password: string }, Success>
  }

  '/auth/register': {
    post: Endpoint<CreateUser, User>
  }

  '/auth/logout': {
    post: Endpoint<null, Success>
  }

  '/user': {
    get: GetEndpoint<User>
    put: Endpoint<UpdateUser, User>
    delete: Endpoint<null, User>
  }

  '/homes': {
    get: GetEndpoint<
      Home[],
      {
        skip?: number
        priceMin?: number
        priceMax?: number
        zipcode?: number
        agent?: string
        school?: string
        sqFootageMin?: number
        sqFootageMax?: number
        bedrooms?: number
        bathrooms?: number
        trending?: boolean
        popular?: boolean
      }
    >
    post: Endpoint<CreateHome, CompleteHome>
  }

  '/homes/:mlsn': {
    get: GetEndpoint<Home>
    put: Endpoint<UpdateHome, CompleteHome>
    delete: Endpoint<null, CompleteHome>
  }

  '/homes/:mlsn/like': {
    post: Endpoint<null, Liked>
  }

  '/homes/:mlsn/showings': {
    get: GetEndpoint<CompleteShowing[]>
  }

  '/user/showings': {
    get: GetEndpoint<CompleteShowing[]>
  }

  '/showings': {
    post: Endpoint<CreateShowing, CompleteShowing>
  }

  '/showings/:id': {
    get: GetEndpoint<CompleteShowing>
    put: Endpoint<UpdateShowing, CompleteShowing>
    delete: Endpoint<null, CompleteShowing>
  }

  '/showings/:id/feedback': {
    get: GetEndpoint<Feedback | null>
    post: Endpoint<CreateFeedback, CompleteFeedback>
  }
}
