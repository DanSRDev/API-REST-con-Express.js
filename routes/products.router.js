const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

// solo se deja la parte especializada
router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

// Todos los endpoints especificos deben ir antes de los dinamicos
// Endpoint especifico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

// Endpoint dinamico
//Los : indican que son un parametro
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  })
});

module.exports = router;
