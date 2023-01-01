const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

// solo se deja la parte especializada
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Todos los endpoints especificos deben ir antes de los dinamicos
// Endpoint especifico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

// Endpoint dinamico
//Los : indican que son un parametro
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

// Recibimos el id del producto a editar
// Con put es igual, solo se cambia patch por put
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

module.exports = router;
