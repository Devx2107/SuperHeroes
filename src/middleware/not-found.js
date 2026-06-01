'use strict';

function notFoundHandler(request, response) {
  response.status(404).json({
    error: 'Not found',
    path: request.originalUrl
  });
}

module.exports = { notFoundHandler };
