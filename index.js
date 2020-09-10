const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./route/admin/auth');
const productRouter = require('./route/admin/products');
const productPublicRouter = require('./route/productsPublic');
const cartRouter = require('./route/cartsRoute');
 const app = express();
 app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
    keys: ['hhafeuhh34']
}))
app.use(authRouter);
app.use(productRouter);
app.use(productPublicRouter);
app.use(cartRouter);
app.listen(process.env.PORT || 5000, () => {
    console.log("listening");
})

// console.log("Hi there");
