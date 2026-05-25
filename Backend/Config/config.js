module.exports = {
  // Server
  port:        process.env.PORT       || 5000,

  nodeEnv:     process.env.NODE_ENV   || 'development',

  isDev:       process.env.NODE_ENV   !== 'production',

  // Database

  mongoUri:    process.env.MONGO_URI,

  // JWT

  jwtSecret:   process.env.JWT_SECRET || 'fallback_secret',

  jwtExpire:   process.env.JWT_EXPIRE || '30d',

  // Client

  clientUrl:   process.env.CLIENT_URL || 'http://localhost:3000',

};