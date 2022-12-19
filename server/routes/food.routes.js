const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {});

router.delete('/:productId', async (req, res) => {});

router.patch('/:productId', async (req, res) => {});

module.exports = router;
