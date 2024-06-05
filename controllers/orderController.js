const fs = require('fs');
const path = require('path');

const ordersPath = path.join(__dirname, '../data/orders.json');
const orderProductsPath = path.join(__dirname, '../data/orderProducts.json');

const readOrders = () => {
  const data = fs.readFileSync(ordersPath, 'utf8');
  return JSON.parse(data);
};

const writeOrders = (data) => {
  fs.writeFileSync(ordersPath, JSON.stringify(data, null, 2));
};

const readOrderProducts = () => {
  const data = fs.readFileSync(orderProductsPath, 'utf8');
  return JSON.parse(data);
};

const writeOrderProducts = (data) => {
  fs.writeFileSync(orderProductsPath, JSON.stringify(data, null, 2));
};

exports.createOrder = (req, res) => {
  const orders = readOrders();
  const newOrder = req.body;
  orders.push(newOrder);
  writeOrders(orders);
  res.status(201).send(newOrder);
};

exports.getOrders = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const orders = readOrders();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultOrders = orders.slice(startIndex, endIndex);
  res.json({
    orders: resultOrders,
    totalPages: Math.ceil(orders.length / limit),
    currentPage: Number(page)
  });
};

exports.searchOrders = (req, res) => {
  const { user_id, order_date } = req.query;
  const orders = readOrders();
  let filteredOrders = orders;

  if (user_id) {
    filteredOrders = filteredOrders.filter(order =>
      order.user_id === Number(user_id)
    );
  }

  if (order_date) {
    filteredOrders = filteredOrders.filter(order =>
      new Date(order.order_date).toISOString().split('T')[0] === new Date(order_date).toISOString().split('T')[0]
    );
  }

  res.send(filteredOrders);
};

exports.updateOrder = (req, res) => {
  const orders = readOrders();
  const index = orders.findIndex(order => order.order_id === Number(req.params.id));
  if (index !== -1) {
    orders[index] = { ...orders[index], ...req.body };
    writeOrders(orders);
    res.send(orders[index]);
  } else {
    res.status(404).send({ error: 'Order not found' });
  }
};

exports.deleteOrder = (req, res) => {
  const orders = readOrders();
  const index = orders.findIndex(order => order.order_id === Number(req.params.id));
  if (index !== -1) {
    const deletedOrder = orders.splice(index, 1);
    writeOrders(orders);
    res.send(deletedOrder);
  } else {
    res.status(404).send({ error: 'Order not found' });
  }
};
