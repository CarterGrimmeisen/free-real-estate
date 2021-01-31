import type { Home, Room, School, Showing, User } from '@prisma/client'
import type { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Success = { success: true }
type CompleteHome = Home & { rooms: Room[]; schools: School[] }

/**
 * Free Real Estate REST API Interface
 *
 * @subtitle Built using Express.js and Crosswalk
 */
export default interface API {
  '/auth/login': {
    /* Login via email/password and fetch authentication cookie */
    post: Endpoint<{ email: string; password: string }, Success>
  }

  '/auth/register': {
    post: Endpoint<Omit<User, 'id' | 'type'>, Omit<User, 'password'>>
  }

  '/auth/logout': {
    post: Endpoint<{}, Success>
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
}
