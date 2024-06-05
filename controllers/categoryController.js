const fs = require('fs');
const path = require('path');

const categoriesPath = path.join(__dirname, '../data/categories.json');

const readCategories = () => {
  const data = fs.readFileSync(categoriesPath, 'utf8');
  return JSON.parse(data);
};

const writeCategories = (data) => {
  fs.writeFileSync(categoriesPath, JSON.stringify(data, null, 2));
};

exports.createCategory = (req, res) => {
  const categories = readCategories();
  const newCategory = req.body;
  categories.push(newCategory);
  writeCategories(categories);
  res.status(201).send(newCategory);
};

exports.getCategories = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const categories = readCategories();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultCategories = categories.slice(startIndex, endIndex);
  res.json({
    categories: resultCategories,
    totalPages: Math.ceil(categories.length / limit),
    currentPage: Number(page)
  });
};

exports.searchCategories = (req, res) => {
  const { name } = req.query;
  const categories = readCategories();
  let filteredCategories = categories;

  if (name) {
    filteredCategories = filteredCategories.filter(category =>
      category.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.send(filteredCategories);
};

exports.updateCategory = (req, res) => {
  const categories = readCategories();
  const index = categories.findIndex(category => category.category_id === Number(req.params.id));
  if (index !== -1) {
    categories[index] = { ...categories[index], ...req.body };
    writeCategories(categories);
    res.send(categories[index]);
  } else {
    res.status(404).send({ error: 'Category not found' });
  }
};

exports.deleteCategory = (req, res) => {
  const categories = readCategories();
  const index = categories.findIndex(category => category.category_id === Number(req.params.id));
  if (index !== -1) {
    const deletedCategory = categories.splice(index, 1);
    writeCategories(categories);
    res.send(deletedCategory);
  } else {
    res.status(404).send({ error: 'Category not found' });
  }
};
