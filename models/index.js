//import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Products belong to category
Product.belongsTo(Category)
//foreignKey: 'category_name'

//categories have several products
Category.hasMany(Product)

//products belong to several tags
Product.belongsToMany(Tag, {
    through: ProductTag,
    as: 'products',
    foreignKey: 'product_id'
});

//Tag belongs to several products
Tag.belongsToMany(Product, {
    through: ProductTag,
    as: 'products',
    foreignKey: 'tag_id'
});

module.exports = {
    Product, 
    Category,
    Tag,
    ProductTag,
};