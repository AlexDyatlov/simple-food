const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

router
  .get('/', auth, async (req, res) => {
    try {
      const list = await User.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.'
      });
    }
  })
  .patch('/:userId', auth, async (req, res) => {
    try {
      const { userId } = req.params;

      if (userId === req.user._id) {
        const updatedUserBasket = await User.findByIdAndUpdate(
          userId,
          { basket: req.body },
          { new: true }
        );

        res.send(updatedUserBasket);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.'
      });
    }
  })
  .delete('/:userId', auth, async (req, res) => {
    try {
      const { userId } = req.params;

      if (userId === req.user._id) {
        await User.updateMany({ userId }, { $unset: { basket: '' } });

        return res.send(null);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже.'
      });
    }
  });

module.exports = router;
