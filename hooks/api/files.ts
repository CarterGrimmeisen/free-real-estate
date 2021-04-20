import { useContext } from '@nuxtjs/composition-api'
import { FileType } from '@prisma/client'
import imageCompression from 'browser-image-compression'
import { useCrosswalk } from '.'
import { DocType } from '~/api/api'

export type BodyType<Func extends (...args: any) => any> = Parameters<Func>[1]
export type QueryType<Func extends (...args: any) => any> = Parameters<Func>[2]
export type ReplaceProp<Val, Prop extends keyof Val, NewType> = Omit<
  Val,
  Prop
> &
  NewType

export async function encodeFile(file: File, type: FileType) {
  let compressed = file
  if (type === 'IMAGE') {
    compressed = await imageCompression(file, {
      maxSizeMB: 2,
      useWebWorker: true,
    })
  }

  const encoded = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(compressed)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = (error) => reject(error)
  })

  return encoded
}

export function useFiles() {
  const api = useCrosswalk()
  const { $axios } = useContext()

  return {
    getHomeFiles: api.get('/homes/:mlsn/files'),
    createFile: api.post('/files'),
    genPDF: (
      _params: {},
      { mlsn }: { mlsn: string },
      { type }: { type: DocType }
    ) =>
      $axios.$post(
        `/api/files/gen?type=${encodeURIComponent(type)}`,
        { mlsn },
        { responseType: 'blob' }
      ),
    deleteFile: api.delete('/files/:id'),
  }
}
