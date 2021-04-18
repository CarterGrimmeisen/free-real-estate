// This is the api definition file,
// learn more about it in the docs: https://git.io/Jt0RF

import {
  Agent,
  Home,
  Feedback,
  School,
  Showing,
  User,
  File,
  FileType,
  Agency,
} from '@prisma/client'
import { Endpoint, GetEndpoint } from 'crosswalk/dist/api-spec'

type Success = { success: true }
type Liked = { liked: boolean }

type CompleteAgent = Agent & { agency: Agency }
export type CompleteHome = Home & {
  schools: School[]
  agent: CompleteAgent
}
export type HomeWithImage = CompleteHome & { files: File[] }

export type CompleteShowing = Showing & { user: User; agent: CompleteAgent }
type CompleteFeedback = Feedback & { showing: Showing }

type CreateShowing = Pick<Showing, 'homeMlsn' | 'date'>
type UpdateShowing = Pick<Showing, 'confirmed'>
type CreateUser = Omit<User, 'id' | 'type'> & { password: string }
type UpdateUser = Partial<CreateUser>
type CreateFeedback = Omit<Feedback, 'id' | 'showingId'>
type CreateFile = {
  type: 'IMAGE' | 'DOCUMENT'
  mime: string
  name: string
  contents: string
}

export type CreateHome = Omit<
  CompleteHome & { files?: CreateFile[] },
  'agentId' | 'likeCount' | 'dailyHits'
>
type UpdateHome = Partial<Omit<CreateHome, 'mlsn'>>

type DocType = 'ClosingDisclosure' | 'PurchaseAgreement' | 'RepairRequest'

export default interface API {
  '/auth/login': {
    /**
     * Login via email/password and fetch authentication cookie
     */
    post: Endpoint<{ email: string; password: string }, Success>
  }

  '/auth/register': {
    post: Endpoint<CreateUser, Success>
  }

  '/auth/check': {
    get: GetEndpoint<Success>
  }

  '/auth/logout': {
    post: Endpoint<null, Success>
  }

  '/user': {
    get: GetEndpoint<User & { agentProfile: CompleteAgent | null }>
    put: Endpoint<UpdateUser, User>
    delete: Endpoint<null, User>
  }

  '/homes': {
    get: GetEndpoint<
      HomeWithImage[],
      {
        skip?: number
        take?: number
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
    get: GetEndpoint<CompleteHome>
    put: Endpoint<UpdateHome, CompleteHome>
    delete: Endpoint<null, CompleteHome>
  }

  '/homes/:mlsn/like': {
    post: Endpoint<null, Liked>
  }

  '/homes/:mlsn/showings': {
    get: GetEndpoint<CompleteShowing[]>
  }

  '/homes/:mlsn/files': {
    get: GetEndpoint<File[], { type?: FileType }>
  }

  '/files': {
    post: Endpoint<
      CreateFile & { homeMlsn: string },
      File,
      { docType?: DocType }
    >
  }

  '/files/:id': {
    delete: Endpoint<null, File>
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
    get: GetEndpoint<Feedback>
    post: Endpoint<CreateFeedback, CompleteFeedback>
  }
}
