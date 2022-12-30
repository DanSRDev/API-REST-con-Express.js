function logErrors (err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  // estamos ejecutando el next como middleware de tipo error
  next(err);
}

// Aunque no usemos una funcion next, debemos ponerla en los parametros
// De esta forma detecta que es un middleware de tipo error
// Debe tener los 4 parametros
function errorHandler (err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorhandler( err, req, res, next){
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorhandler };

