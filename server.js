const fastify = require('fastify')({ logger: true })
const route = require('./src/routes')

fastify.route(route)

fastify.listen({ port:process.env.PORT}, (err) =>{
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }

    console.log('Servidor rodando')
})