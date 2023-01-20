const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const sortBy = req.query.sort
    const allProducts = await Product.find().sort(sortBy)
        return res.send({
            Products: [...allProducts]
        });
});

router.post('/', async (req, res) => {
  const NewProduct = new Product({
    id: String,
    name: String,
    price: Number,
    description: String,
    quantity: Number,
    unit: String,
  })
  await NewProduct.save()
  return res.send(req.body);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deleted = await Product.findOneAndDelete(id)
  if (deleted == null){
    return res.send("Object does not exist")
  }
  return res.send({
    deletedProductId: id
  });
});

router.put('/:id', async (req, res) =>{
  const id = req.params.id
  const update = req.body
  const updated = await Product.findOneAndUpdate({ "id": id }, { "$set": { "name": update.name, "price": update.price, "quantity": update.quantity,"description": update.description,"unit":update.unit}})
  return res.send({updated})
})

router.get('/raport', async (req,res) =>{
  const raport = Product.find()
  raport.map(product => {product.name,product.quantity,product.quantity*product.price})
})

module.exports = router;
