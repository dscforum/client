const config = {
  api: {
    url: process.env.NODE_ENV === 'production' ? 'https://api.dscforum.com/v1' : 'http://localhost:3004/v1'
  }
};

export default config;