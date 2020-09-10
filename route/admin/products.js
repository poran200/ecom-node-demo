const express = require('express');
const {check, validationResult} = require('express-validator');
const multer = require('multer');
const {handelError,requireAuth} = require('./errorMiderware')
const productRepository = require('../../repository/productReopsitory');
const newProductTemplate = require('../../views/admin/product/new');
const editProductTemplate = require('../../views/admin/product/edit');
const {reqTitle, reqPrice} = require('./validator');
const productListTemplate = require('../../views/admin/product');
const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.get('/admin/products',requireAuth, (async (req, res) => {
    const products = await productRepository.getAll();
    return res.send(productListTemplate({products}))
}));

router.get('/admin/products/new',requireAuth, ((req, res) => {
    res.send(newProductTemplate({}));
}));
router.post('/admin/products/new',
    requireAuth,
    upload.single('image'),
    [reqTitle, reqPrice],
    handelError(newProductTemplate)
    , (async (req, res) => {

        let {title, price} = req.body;
        try {
            const image = req.file.buffer.toString('base64');
            price =parseFloat(price);
            await productRepository.create({title, price, image});
            return res.redirect('/admin/products');
        } catch (e) {
            console.log(e)
            return res.status(500).send('Internal Server Error');
        }
    }));
router.get('/admin/products/:id/edit',requireAuth, async (req, res) => {
    const id = req.params.id;
    const product = await productRepository.getOneBy({id});
    if (!product){
        res.send('Product not found');
    }
    res.send(editProductTemplate({product}))
});
router.post('/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [reqTitle,reqPrice],
    handelError(editProductTemplate,async (req)=>{
        const product = await productRepository.findById(req.params.id);
        return {product};
    }),
    async (req, res) => {
     const change = req.body;
     if (req.file){
         change.image = req.file.buffer.toString('base64');
     }
         try {
             await  productRepository.update(req.params.id, change);
             res.redirect('/admin/products');
         }catch (e) {
             res.send(e.message);
         }
});
router.post('/admin/products/:id/delete',requireAuth,
   async (req, res) => {
    await productRepository.delete(req.params.id);
    res.redirect('/admin/products');
});

module.exports = router
