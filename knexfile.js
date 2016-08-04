require('dotenv').config()
module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  },
  
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
}
