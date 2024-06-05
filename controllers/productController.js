const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data);
};

const writeProducts = (data) => {
  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
};

exports.createProduct = (req, res) => {
  const products = readProducts();
  const newProduct = req.body;
  products.push(newProduct);
  writeProducts(products);
  res.status(201).send(newProduct);
};

exports.getProducts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const products = readProducts();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultProducts = products.slice(startIndex, endIndex);
  res.json({
    products: resultProducts,
    totalPages: Math.ceil(products.length / limit),
    currentPage: Number(page)
  });
};

exports.searchProducts = (req, res) => {
  const { name, category, min_price, max_price } = req.query;
  const products = readProducts();
  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(product =>
      product.category_id === Number(category)
    );
  }

  if (min_price) {
    filteredProducts = filteredProducts.filter(product =>
      product.price >= Number(min_price)
    );
  }

  if (max_price) {
    filteredProducts = filteredProducts.filter(product =>
      product.price <= Number(max_price)
    );
  }

  res.send(filteredProducts);
};

exports.updateProduct = (req, res) => {
  const products = readProducts();
  const index = products.findIndex(product => product.product_id === Number(req.params.id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeProducts(products);
    res.send(products[index]);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
};

exports.deleteProduct = (req, res) => {
  const products = readProducts();
  const index = products.findIndex(product => product.product_id === Number(req.params.id));
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    writeProducts(products);
    res.send(deletedProduct);
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
};
