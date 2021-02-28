// This is the api definition file,
// learn more about it in the docs: https://git.io/Jt0RF

import {
  Agent,
  Feedback,
  Home,
  Profile,
  School,
  Showing,
  User,
} from '@prisma/client'
import { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Success = { success: true }
type CompleteHome = Home & { schools: School[] }
type CompleteShowing = Showing & { user: Profile; agent: Agent }
type CompleteFeedback = Feedback & { showing: Showing }

export default interface API {
  '/auth/login': {
    /**
     * Login via email/password and fetch authentication cookie
     */
    post: Endpoint<{ email: string; password: string }, Success>
  }

  '/auth/register': {
    post: Endpoint<Omit<User, 'id' | 'type'>, Omit<User, 'password'>>
  }

  '/auth/logout': {
    post: Endpoint<null, Success>
  }

  '/user': {
    get: GetEndpoint<Omit<User, 'password'>>
    put: Endpoint<Partial<Omit<User, 'id' | 'type'>>, Omit<User, 'password'>>
    delete: Endpoint<null, Omit<User, 'password'>>
  }

  '/user/showings': {
    get: GetEndpoint<Showing & { home: Home }>
  }

  '/homes': {
    get: GetEndpoint<Home[]>
    post: Endpoint<Omit<CompleteHome, 'id' | 'listAgentId' | 'dailyHits'>, Home>
  }

  '/homes/:mlsn': {
    get: GetEndpoint<Home>
    put: Endpoint<Partial<Omit<CompleteHome, 'mlsn' | 'dailyHits'>>, Home>
    delete: Endpoint<null, Home>
  }

  '/homes/:mlsn/showings': {
    get: GetEndpoint<Showing[]>
    post: Endpoint<
      Omit<Showing, 'agentId' | 'userId' | 'confirmed' | 'homeMlsn'>,
      CompleteShowing
    >
    put: Endpoint<Pick<Showing, 'confirmed'>, CompleteShowing>
    delete: Endpoint<null, CompleteShowing>
  }

  '/homes/:mlsn/showings/:id/feedback': {
    get: GetEndpoint<Feedback | null>
    put: Endpoint<Omit<Feedback, 'showingId'>, CompleteFeedback>
  }
}
