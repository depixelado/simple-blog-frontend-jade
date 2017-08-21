const request = require('request-promise-native');

module.exports = function RequesterFactory(defaultOptions) {
  return function requester({ endPoint = '', options = {} }) {
    // Build final URL
    const uri = endPoint;

    // Build request options
    const requestOptions = Object.assign(
      {},
      defaultOptions,
      {
        uri,
        qs: options.qs,
      },
      options,
    );

    // Generate autentication header value
    return request(requestOptions);
  };
};
