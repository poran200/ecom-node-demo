const express = require('express');
const pulicProductTempete= require('../views/publicProducts/productpublic');
const productRepository = require('../repository/productReopsitory')
const router = express.Router();
router.get('/', async (req,res) => {
     const products = await productRepository.getAll();
     return res.send(pulicProductTempete({products}));
})
module.exports = router
