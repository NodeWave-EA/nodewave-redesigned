const startTime = new Date()

export default defineEventHandler(async (event) => {
  console.log({
    method: event.req.method,
    url: event.req.url,
    headers: event.req.headers
  })

  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(), // seconds since start
    upSince: startTime.toISOString(),
    environment: process.env.NODE_ENV,
    bunVersion: process.versions.bun,
    memoryUsage: process.memoryUsage()
  }
})
