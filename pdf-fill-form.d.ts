type PDFField = {
  name: string
  page: number
  value: string | boolean
  id: number
  type: 'text' | 'checkbox'
}

type Params = { save: 'pdf'; cores: number; scale: number; antialias: boolean }

export function write(
  fileName: string,
  fields: Record<string, any>,
  params: Params
): Promise<Buffer>

export function read(fileName: string): PDFField[]
