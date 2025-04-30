  'use strict'
  
  import fp from 'fastify-plugin'
  
  export default fp(async function (fastify, opts) {
    fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
        try {
          var json = JSON.parse(body)
          done(null, json)
        } catch (err) {
          err.statusCode = 400
          done(err, undefined)
        }
      })
  })