'use strict';

function errorHandler(error, _request, response, _next) {
  if (error && error.type === 'entity.parse.failed') {
    response.status(400).json({ error: 'Invalid JSON body.' });
    return;
  }

  const status = error.status || 500;
  response.status(status).json({
    error: error.message || 'Unexpected server error.'
  });
}

module.exports = { errorHandler };
