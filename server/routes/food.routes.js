const express = require('express');
const router = express.Router({ mergeParams: true });

const Food = require('../models/Food');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

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

router.delete('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const removedFood = await Food.findById(productId);

    const adminUser = await User.find({ isAdmin: true });
    const adminUserId = adminUser[0]._id.toString();

    if (adminUserId === req.user._id) {
      await removedFood.remove();
      return res.send(null);
    } else {
      return res.status(403).json({ message: 'Доступ запрещен.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    });
  }
});

router.patch('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const adminUser = await User.find({ isAdmin: true });
    const adminUserId = adminUser[0]._id.toString();

    if (adminUserId === req.user._id) {
      const updatedFood = await Food.findByIdAndUpdate(productId, req.body, {
        new: true
      });
      res.send(updatedFood);
    } else {
      return res.status(403).json({ message: 'Доступ запрещен.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    });
  }
});

module.exports = router;
