import { useCrosswalk } from '.'

export function useHomes() {
  const api = useCrosswalk()

  return {
    createHome: api.post('/homes'),
    getHomes: api.get('/homes'),
    getHome: api.get('/homes/:mlsn'),
    updateHome: api.put('/homes/:mlsn'),
    deleteHome: api.delete('/homes/:mlsn'),
    likeHome: api.post('/homes/:mlsn/like'),
  }
}
