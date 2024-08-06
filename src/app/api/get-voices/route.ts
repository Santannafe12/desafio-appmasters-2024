export async function GET(request: Request) {
  console.log(request.body)
  return Response.json('GET-VOICES')
}
