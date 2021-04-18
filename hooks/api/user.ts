import { useCrosswalk } from '.'

export function useUser() {
  const api = useCrosswalk()

  return {
    getUser: api.get('/user'),
    updateUser: api.put('/user'),
    deleteUser: api.delete('/user'),
    getLikedHomes: api.get('/user/liked'),
  }
}
