// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const { version } = require('./package.json')
const fetch = require('node-fetch')

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/version', async (req, reply) => {
  reply.send({ version })
})

fastify.get('/todos', async (req, reply) => {
  try {
    const response = await fetch('http://jsonplaceholder.typicode.com/todos')
    const json = await response.json();
    reply.send({ data: json })
  } catch (error) {
    console.log(error);
  }
})

// Run the server!
const start = async () => {
  try {
    // We have to specify 0.0.0.0 to be available IPv4 interfaces eg. Docker
    await fastify.listen(4000, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()