import _ from 'lodash';
import request from 'request-promise-native';

module.exports = function RequesterFactory(defaultOptions) {
  return function requester({ endPoint = '', options = {} }) {
    // Build final URL
    const uri = endPoint;

    // Build request options
    const requestOptions = _.merge(
      {},
      defaultOptions,
      options,
      {
        uri,
      },
    );

    // Generate autentication header value
    return request(requestOptions);
  };
};
