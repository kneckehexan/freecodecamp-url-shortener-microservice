const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleWare = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later'
  }

  if(err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = 400;
  }

  if(err.name === 'CastError'){
    customError.msg = `No URL found for number ${err.value}`;
    customError.statusCode = 404;
  }

  if(err._message === "URL validation failed"){
    customError.msg = 'invalid url';
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({error:customError.msg});
}

module.exports = errorHandlerMiddleWare;