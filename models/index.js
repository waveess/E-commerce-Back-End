// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belong to a category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belong to many tags
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tags',
  foreignKey: 'product_id',
});

// Tags belong to many products
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'products',
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};