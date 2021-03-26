import { useCrosswalk } from '.'

export function useAuth() {
  const api = useCrosswalk()

  return {
    login: api.post('/auth/login'),
    register: api.post('/auth/register'),
    logout: api.post('/auth/logout'),
  }
}
