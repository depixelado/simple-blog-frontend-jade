const dotenv = require('dotenv');
const env = process.env;

// Load environment vars
dotenv.load();

const config = {
  app: {
    port : env.PORT || 3030,
    dateFormat: 'D-mm-Y',
  },
  posts: {
    limitPerPage: env.POST_PER_PAGE,
  },
  blogApi: {
    baseUrl: env.BLOG_API_BASE_URL,
    user: env.BLOG_API_USER,
    password: env.BLOG_API_PASSWORD
  }
};

module.exports = config;

