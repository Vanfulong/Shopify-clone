
const express = require('express')
const { Liquid } = require('liquidjs')
const data = {
    "products": [
      {
        "id": "001",
        "name": "Product A",
        "description": "This is the first product.",
        "price": 19.99,
        "quantity": 10
      },
      {
        "id": "002",
        "name": "Product B",
        "description": "This is the second product.",
        "price": 29.99,
        "quantity": 5
      },
      {
        "id": "003",
        "name": "Product C",
        "description": "This is the third product.",
        "price": 39.99,
        "quantity": 15
      },
      {
        "id": "004",
        "name": "Product D",
        "description": "This is the fourth product.",
        "price": 49.99,
        "quantity": 8
      },
      {
        "id": "005",
        "name": "Product E",
        "description": "This is the fifth product.",
        "price": 59.99,
        "quantity": 0
      }
    ]
  }

const app = express()
const engine = new Liquid({
  root: __dirname, // for layouts and partials
  extname: '.liquid'
})

engine.registerFilter('money', (value) => {
    return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
})


app.engine('liquid', engine.express()) // register liquid engine
app.set('views', ['./partials', './views']) // specify the views directory
app.set('view engine', 'liquid') // set to default

app.get('/', function (req, res) {
    res.render('home', {
      title: 'Home',
      products: data.products
    })
})
app.get('/product/:product_id', function (req, res) {
  const product = data.products.filter(product => product.id === req.params.product_id)
  res.render('product', {
    product: product[0],    
    products: data.products,
    title: 'Welcome to liquidjs!'
  })
})
app.listen(3000, function () {
  console.log('Express running: http://localhost:3000')
})