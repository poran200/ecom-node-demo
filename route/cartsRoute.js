const express = require('express');
const cartsRepository = require('../repository/carts');
const productRepository = require('../repository/productReopsitory');
const cartShowTemplate = require('../views/cartsshowTemplate')
const routes = express.Router();
// receive a post request to add item into chart
routes.post('/cart/products', async (req, res) => {
    let cart;

    async function createCart(req) {
        cart = await cartsRepository.create({items: []});
        req.session.cartId = cart.id;
    }

    if(!(req.session.cartId)){
        await createCart(req);
    }else {
          cart = await cartsRepository.findById(req.session.cartId);
          if (!cart){
              req.session.cartId = null;
            return res.redirect('/');
          }
     }
     console.log(cart);
     const existingItem = cart.items.find(item => item.id === req.body.productId);
     if (existingItem){
         existingItem.quantity++;
     }else {
         cart.items.push({id: req.body.productId, quantity: 1})
     }
     await cartsRepository.update(cart.id,{
         items:cart.items,
     })
     res.redirect('/cart');
});

// receive a get request to show the  chart
routes.get('/cart',(async (req, res) => {
    if (!req.session.cartId) {
        return res.redirect('/')
    }
    const cart =await cartsRepository.findById(req.session.cartId);
    for (let item of cart.items){
        item.product = await productRepository.findById(item.id);
    }
    res.send(cartShowTemplate({items:cart.items}));
}))
// receive a post request to delete item from a cart
module.exports = routes;
