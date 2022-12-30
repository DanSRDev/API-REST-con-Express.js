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

module.exports = { logErrors, errorHandler };

