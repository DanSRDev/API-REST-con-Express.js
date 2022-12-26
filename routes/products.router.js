const express = require('express');
const ProductsService = require('./../services/product.service');

const router = express.Router();
const service = new ProductsService();

// solo se deja la parte especializada
router.get('/', (req, res) => {
  const products = service.find();
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
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  })
});

// Recibimos el id del producto a editar
// Con put es igual, solo se cambia patch por put
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id,
  })
});

module.exports = router;
