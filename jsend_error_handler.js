/**
 * Handle any connect errors with a JSON response (according to JSend specification)
 * see [https://labs.omniti.com/labs/jsend]
 *
 * Response looks like:
 *   {
 *     status: "error"
 *     message: "A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong"
 *     code: "A numeric code corresponding to the error"
 *     data: "A generic container for any other information about the error, i.e. the conditions that caused the error, stack traces, etc."
 *   }
 *
 * @middleware
 */
RestMiddleware.handleErrorAsJsend = function (err, request, response, next) { // jshint ignore:line
  // If we at least put in some effort to throw a user-facing Meteor.Error,
  // the default code should be less severe
  if (err.sanitizedError && err.sanitizedError.errorType === 'Meteor.Error') {
    if (!err.sanitizedError.statusCode) {
      err.sanitizedError.statusCode = err.statusCode || 400;
    }

    err = err.sanitizedError;
  } else if (err.errorType === 'Meteor.Error') {
    if (!err.statusCode) err.statusCode = 400;
  } else {
    // Hide internal error details
    // XXX could check node_env here and return full
    // error details if development
    var statusCode = err.statusCode;
    err = new Error();
    err.statusCode = statusCode;
  }

  // If an error has a `data` property, we
  // send that. This allows packages to include
  // extra client-safe data with the errors they throw.
  var data = {
    error: err.error || 'internal-server-error',
    reason: err.reason || 'Internal server error',
    details: err.details,
    data: err.data
  };

  var errorStatusCode = err.statusCode || 500;

  var body = {
    status: "error",
    message: data.reason,
    code: errorStatusCode,
    data: data
  };

  body = JSON.stringify(body, null, 2);

  response.statusCode = errorStatusCode;
  response.setHeader('Content-Type', 'application/json');
  response.write(body);
  response.end();
};
