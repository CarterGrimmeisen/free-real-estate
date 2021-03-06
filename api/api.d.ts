// This is the api definition file,
// learn more about it in the docs: https://git.io/Jt0RF

import { Agent, Feedback, Home, School, Showing, User } from '@prisma/client'
import { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Success = { success: true }
type Liked = { liked: boolean }
type CreateOrUpdateUser = User & { password: string }
type CompleteHome = Home & { schools: School[] }
type CompleteFeedback = Feedback & { showing: Showing }
type ShowingInput = Omit<Showing, 'date'> & { date: string }
type CompleteShowing = Showing & { user: User; agent: Agent }

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
    get: GetEndpoint<Home[]>
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

  '/showings/user': {
    get: GetEndpoint<CompleteShowing[]>
  }

  '/showings/home/:mlsn': {
    get: GetEndpoint<CompleteShowing[]>
    post: Endpoint<Pick<ShowingInput, 'date'>, CompleteShowing>
    delete: Endpoint<null, CompleteShowing>
  }

  '/showings/home/:mlsn/:userId/feedback': {
    get: GetEndpoint<Feedback | null>
    post: Endpoint<Omit<Feedback, 'showingId' | 'id'>, CompleteFeedback>
  }

  '/showings/home/:mlsn/:userId': {
    put: Endpoint<Pick<ShowingInput, 'confirmed'>, CompleteShowing>
  }
}
