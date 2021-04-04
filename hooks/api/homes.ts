import { BodyType, encodeFile, ReplaceProp } from './files'
import { useCrosswalk } from '.'

export function useHomes() {
  const api = useCrosswalk()

  const _createHome = api.post('/homes')

  const createHome = async (
    params: {},
    body: ReplaceProp<BodyType<typeof _createHome>, 'files', { files: File[] }>,
    query: null
  ) => {
    const { files, ...home } = body
    const newFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: 'IMAGE' as const,
        mime: file.type,
        contents: await encodeFile(file, 'IMAGE'),
        homeMlsn: body.mlsn,
      }))
    )

    return _createHome(params, { ...home, files: newFiles }, query)
  }

  return {
    _createHome,
    createHome,
    getHomes: api.get('/homes'),
    getHome: api.get('/homes/:mlsn'),
    updateHome: api.put('/homes/:mlsn'),
    deleteHome: api.delete('/homes/:mlsn'),
    likeHome: api.post('/homes/:mlsn/like'),
  }
}
