export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return {
    title: String(query.title ?? 'Untitled'),
    description: String(query.description ?? ''),
    theme: String(query.theme ?? 'teal'),
    layout: String(query.layout ?? 'center'),
    brand: String(query.brand ?? 'nodewave')
  }
})
