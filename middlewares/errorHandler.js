import colors from 'colors';

// Middleware to log errors
const logErrors = (err, req, res, next) => {
  // console.log(colors.bgRed.white(err));
  next(err);
};

// Handler for Boom errors
const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

// Handler for Mongoose errors
const mongooseErrorHandler = (err, req, res, next) => {
  if (err.name === 'MongoServerError' && err.code === 11000) {
    res.status(409).json({
      statusCode: 409,
      error: 'A record with these details already exists',
      details: err.keyValue,
    });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({
      statusCode: 400,
      error: 'Validation Error',
      details: err.errors,
    });
  }
  next(err);
};

// Generic error handler
const errorHandler = (err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export { logErrors, errorHandler, boomErrorHandler, mongooseErrorHandler };
