const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 3100;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
