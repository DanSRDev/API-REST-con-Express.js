const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorhandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'htttps://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

// El orden en que se pongan los middlewares sera el orden en que se ejecuten
// Como errorHandler no tiene next, ya no ejecuta lo que tiene despues, por eso se coloca despues del logErrors
app.use(logErrors);
app.use(boomErrorhandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

