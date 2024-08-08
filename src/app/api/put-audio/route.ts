import { put } from '@vercel/blob'

export async function PUT(request: Request) {
  const form = await request.formData()
  const file = form.get('file') as File

  if (!file) {
    return new Response('Não foi providenciado arquivo!', { status: 400 })
  }

  try {
    const blob = await put(file.name, file, { access: 'public' })
    return new Response(JSON.stringify({ url: blob.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response('Erro ao upload.', { status: 500 })
  }
}
