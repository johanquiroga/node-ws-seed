let whitelist = process.env.WHITELIST.split(',').filter(host => host !== '');
if (whitelist.length === 0) {
  whitelist = ['http://localhost:3000'];
}

module.exports = {
  mongoUrl: process.env.MONGO_URL,
  whitelist,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  apiUrl: process.env.API_URL,
  clientUrl: process.env.CLIENT_URL,
};
