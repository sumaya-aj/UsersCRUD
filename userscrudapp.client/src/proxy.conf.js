const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:5030';

const PROXY_CONFIG = [
  {
    context: [
      "/api/Users/GetAll",
      "/api/Users/Get",
      "/api/Users/Delete",
      "/api/Users/Update",
      "/api/Users/Add"
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
