export function notFoundHandler(req, _res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || error.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      errors: Object.entries(error.errors).map(([field, value]) => ({
        field,
        message: value.message
      }))
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      errors: [{ field: error.path, message: 'Invalid resource identifier' }]
    });
  }

  return res.status(statusCode).json({
    success: false,
    errors: [
      {
        field: 'server',
        message: isProduction && statusCode === 500 ? 'Internal server error' : error.message
      }
    ],
    ...(isProduction ? {} : { stack: error.stack })
  });
}
