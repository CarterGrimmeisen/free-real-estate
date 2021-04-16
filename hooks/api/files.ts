import { FileType } from '@prisma/client'
import imageCompression from 'browser-image-compression'
import { useCrosswalk } from '.'

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

  return {
    createFile: api.post('/files'),
    deleteFile: api.delete('/files/:id'),
  }
}
