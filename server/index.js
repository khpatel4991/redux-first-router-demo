import 'babel-polyfill'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import fastifyCompress from 'fastify-compress'
// import fastifyJwt from 'fastify-jwt'
// import fp from 'fastify-plugin'
import fastifyCookie from 'fastify-cookie'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'

const DEV = process.env.NODE_ENV === 'development'
const { publicPath, path: outputPath } = clientConfig.output
const app = fastify({
  logger: {
    prettyPrint: { colorize: true, forceColor: true }
  }
})

// JWTOKEN COOKIE - in a real app obviously you set this after signup/login:

app.register(fastifyCookie)

// app.use((req, res, next) => {
//   const cookie = req.cookies.jwToken
//   const jwToken = 'fake' // TRY: set to 'real' to authenticate ADMIN route

//   if (cookie !== jwToken) {
//     res.cookie('jwToken', jwToken, { maxAge: 900000 })
//     req.cookies.jwToken = jwToken
//   }

//   next()
// })

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(webpackDevMiddleware(multiCompiler, { publicPath, stats: { colors: true } }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath }
  }))
}
else {
  const clientStats = require('../buildClient/stats.json') // eslint-disable-line import/no-unresolved
  const serverRender = require('../buildServer/main.js').default // eslint-disable-line import/no-unresolved
  app.register(fastifyCompress, { threshold: 0 })
  app.use(serverRender({ clientStats, outputPath }))
  app.register(fastifyStatic, {
    root: outputPath,
    prefix: '/static/'
  })
}

app.listen(3000, err => {
  if (err) {
    console.info('Error starting server', err.message)
  }
  app.log.info('Listening @ http://localhost:3000/')
})
