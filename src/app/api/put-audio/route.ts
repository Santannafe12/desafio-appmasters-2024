import { put } from '@vercel/blob'

// hash file name

export async function PUT(request: Request) {
  const form = await request.formData()
  const file = form.get('file') as File
  const blob = await put(file.name, file, { access: 'public' })

  return Response.json(blob)
}
