'use strict'

import fp from 'fastify-plugin'
import fastifySwaggerUi from '@fastify/swagger-ui'

export default fp(async function (fastify, opts) {
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })
})
