const express = require('express');
const Usersservice = require('../services/users.service')

const router = express.Router();
const service = new Usersservice();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users)
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

module.exports = router;
