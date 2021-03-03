// This is the api definition file,
// learn more about it in the docs: https://git.io/Jt0RF

import { Agent, Home, School, Showing, User } from '@prisma/client'
import { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Success = { success: true }
type Liked = { liked: boolean }
type CreateOrUpdateUser = User & { password: string }
type CompleteHome = Home & { schools: School[] }
type ShowingInput = Omit<Showing, 'id' | 'agentId' | 'confirmed'> & {
  date: string
}
type CompleteShowing = Showing & { user: User; agent: Agent; home: Home }
export default interface API {
  '/auth/login': {
    /**
     * Login via email/password and fetch authentication cookie
     */
    post: Endpoint<{ email: string; password: string }, Success>
  }

  '/auth/register': {
    post: Endpoint<Omit<CreateOrUpdateUser, 'id' | 'type'>, User>
  }

  '/auth/logout': {
    post: Endpoint<null, Success>
  }

  '/user': {
    get: GetEndpoint<User>
    put: Endpoint<Partial<Omit<CreateOrUpdateUser, 'id' | 'type'>>, User>
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
    post: Endpoint<Omit<CompleteHome, 'id' | 'listAgentId' | 'dailyHits'>, Home>
  }

  '/homes/:mlsn': {
    get: GetEndpoint<Home>
    put: Endpoint<Partial<Omit<CompleteHome, 'mlsn' | 'dailyHits'>>, Home>
    delete: Endpoint<null, Home>
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
    post: Endpoint<Omit<ShowingInput, 'userId'>, CompleteShowing>
  }

  '/showings/:id': {
    get: GetEndpoint<CompleteShowing>
    put: Endpoint<Partial<Pick<Showing, 'confirmed'>>, CompleteShowing>
    delete: Endpoint<null, CompleteShowing>
  }
}
