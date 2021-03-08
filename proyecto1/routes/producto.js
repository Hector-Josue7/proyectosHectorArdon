const express = require('express')
const productCtrl = require('../controllers/producto')
const router = express.Router()

router.get('/products', productCtrl.getProducts )// http://localhost:3001/api/products
router.get('/product/:id', productCtrl.getProduct)// http://localhost:3001/api/product/:id
router.post('/product', productCtrl.saveProduct) // http://localhost:3001/api/product
router.put('/product/:id', productCtrl.updateProduct) // http://localhost:3001/api/product/:id
router.delete('/product/:id', productCtrl.deleteProduct) // http://localhost:3001/api/product/:id

module.exports = router

