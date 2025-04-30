'use strict'

import path from 'node:path'
import AutoLoad from '@fastify/autoload'

export default async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(path.resolve(), 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(path.resolve(), 'routes'),
    options: Object.assign({}, opts)
  })
}