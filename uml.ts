// This is the api definition file,
// learn more about it in the docs: https://git.io/Jt0RF

import {
  Agent as AgentType,
  Home as HomeType,
  School as SchoolType,
  Showing as ShowingType,
  User as UserType,
} from '@prisma/client'
import { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Wrap<T> = Partial<T>

type Success = { success: true }
type Liked = { liked: boolean }
type Agent = AgentType
type School = SchoolType
type Home = HomeType & { schools: School[] }
type User = UserType
type Showing = ShowingType & { user: User; agent: Agent }

type Login = { email: string; password: string }

export default interface API {
  '/auth/login': {
    /**
     * Login via email/password and fetch authentication cookie
     */
    post: Endpoint<Wrap<Login>, Wrap<Success>>
  }

  '/auth/register': {
    post: Endpoint<Wrap<User>, Wrap<User>>
  }

  '/auth/logout': {
    post: Endpoint<null, Wrap<Success>>
  }

  '/user': {
    get: GetEndpoint<Wrap<User>>
    put: Endpoint<Wrap<User>, Wrap<User>>
    delete: Endpoint<null, Wrap<User>>
  }

  '/homes': {
    get: GetEndpoint<
      Wrap<Home>[],
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
    post: Endpoint<Wrap<Home>, Wrap<Home>>
  }

  '/homes/:mlsn': {
    get: GetEndpoint<Wrap<Home>>
    put: Endpoint<Wrap<Home>, Wrap<Home>>
    delete: Endpoint<null, Wrap<Home>>
  }

  '/homes/:mlsn/like': {
    post: Endpoint<null, Wrap<Liked>>
  }

  '/homes/:mlsn/showings': {
    get: GetEndpoint<Wrap<Showing>>
  }

  '/user/showings': {
    get: GetEndpoint<Wrap<Showing>[]>
  }

  '/showings': {
    post: Endpoint<Wrap<Showing>, Wrap<Showing>>
  }

  '/showings/:id': {
    get: GetEndpoint<Wrap<Showing>>
    put: Endpoint<Wrap<Showing>, Wrap<Showing>>
    delete: Endpoint<null, Wrap<Showing>>
  }
}
