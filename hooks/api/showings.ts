import { useCrosswalk } from '.'

export function useShowings() {
  const api = useCrosswalk()

  return {
    getUserShowings: api.get('/user/showings'),
    getHomeShowings: api.get('/homes/:mlsn/showings'),
    createShowing: api.post('/showings'),
    confirmShowing: api.put('/showings/:id'),
    cancelShowing: api.delete('/showings/:id'),
  }
}
