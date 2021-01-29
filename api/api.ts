import type { Home, User } from '@prisma/client'
import type { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Success = { success: true }

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
    delete: Endpoint<{}, Omit<User, 'password'>>
  }

  '/homes': {
    get: GetEndpoint<Home[]>
    post: Endpoint<
      Partial<Omit<Home, 'id' | 'listAgentId' | 'dailyHits'>>,
      Home
    >
  }

  '/homes/:id': {
    get: GetEndpoint<Home>
    put: Endpoint<Partial<Omit<Home, 'id' | 'dailyHits'>>, Home>
    delete: Endpoint<{}, Home>
  }
}
