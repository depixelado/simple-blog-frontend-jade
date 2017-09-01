import config from '../config';
import requesterFactory from '../utils/requester-factory';

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function generateBasicAuthHeaderValue
 * @param {string} username Authentication username
 * @param {String} password Authentication password
 */
const generateBasicAuthHeaderValue = function generateBasicAuthHeaderValue(username, password) {
  const authHash = new Buffer(`${username}:${password}`).toString('base64');
  return `Basic ${authHash}`;
};

/** Blog Api Requester */
const blogApiRequester = (username, password) => requesterFactory({
  json: true,
  baseUrl: config.blogApi.baseUrl, // Blog api base URL
  headers: {
    Authorization: generateBasicAuthHeaderValue(username, password),
  },
});

module.exports = blogApiRequester;
