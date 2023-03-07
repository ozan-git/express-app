const jwt = require('jsonwebtoken') // jwt is a library that helps us to encode and decode the token easily and quickly.

const SECRET_KEY = '1234567!' // This is the secret key that we will use to encode and decode the token.

const auth = {
  decode: (req, res, next) => {
    if (!req.headers['authorization']) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }
    // We are decoding the token here. The token is in the format of Bearer <auth-token>
    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer <auth-token>
      const decoded = jwt.decode(token, SECRET_KEY)
      console.log(decoded)

      req.information = decoded
      return next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({
        success: false,
        message: 'Invalid auth token'
      })
    }
  },
  encode: (req, res, next) => { // This is the middleware that we will use to encode the token. We will use this middleware in the route that we want to protect.
    const payload = {
      username: req.body.username,
      password: req.body.password
    }
    // perform some db operations to check if the user information is
    // correct or not.
    const token = jwt.sign(payload, SECRET_KEY)
    req.token = token
    next()
  }
}

module.exports = auth