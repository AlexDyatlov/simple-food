const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

router
  .get('/:userId', auth, async (req, res) => {
    try {
      const { userId } = req.params;
      const currentUser = await User.findById(userId);

      res.status(200).send(currentUser);
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
          req.body,
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
