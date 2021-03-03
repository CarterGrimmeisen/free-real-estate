import { useCrosswalk } from '.'

export function useHomes() {
  const api = useCrosswalk()

  return {
    getHomes: api.get('/homes'),
    getHome: api.get('/homes/:mlsn'),
    createHome: api.post('/homes'),
    updateHome: api.put('/homes/:mlsn'),
    deleteHome: api.delete('/homes/:mlsn'),
    likeHome: api.post('/homes/:mlsn/like'),
  }
}
