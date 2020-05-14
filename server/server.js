// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const { version } = require('./package.json')

// Enable Cors
fastify.register(require('fastify-cors'), { 
  origin: (origin, cb) => {
    if (/localhost/.test(origin)) {
        //  Request from localhost will pass
        cb(null, true)
        return
    }
    cb(new Error("Not Allowed"), false)
  }
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/version', (req, reply) => {
  reply.send({ version })
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(4000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()