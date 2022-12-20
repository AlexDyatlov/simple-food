const express = require('express');
const router = express.Router({ mergeParams: true });

const Food = require('../models/Food');

router.get('/', async (req, res) => {
  try {
    const list = await Food.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    });
  }
});

router.delete('/:productId', async (req, res) => {});

router.patch('/:productId', async (req, res) => {});

module.exports = router;
