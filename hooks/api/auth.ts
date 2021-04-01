import { useCrosswalk } from '.'

export function useAuth() {
  const api = useCrosswalk()

  return {
    login: api.post('/auth/login'),
    register: api.post('/auth/register'),
    check: api.get('/auth/check'),
    logout: api.post('/auth/logout').bind(api, {}, null),
  }
}
