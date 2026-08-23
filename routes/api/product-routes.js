const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id','category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
        as: 'tags',
      },
    ],
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// get one product 
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    where: {
      id: req.params.id
    },

    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
        as: 'tags',
      },
    ],
  })
  .then(dbProductData => {
    if(!dbProductData){
      res.status(404).json({ message: "No Product found with this id" });
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

// create new product 
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  const { product_name, price, stock, category_id, tagIds } = req.body;

  Product.create({ product_name, price, stock, category_id })
    .then((product) => {
      if (tagIds && tagIds.length) {
        const productTagIdArr = tagIds.map((tag_id) => ({
          product_id: product.id,
          tag_id,
        }));
        return ProductTag.bulkCreate(productTagIdArr).then(() => product);
      }
      return product;
    })
    .then((product) => res.status(200).json(product))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product 
router.put('/:id', (req, res) => {
  const { product_name, price, stock, category_id, tagIds } = req.body;

  Product.update(
    { product_name, price, stock, category_id },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(([updatedRows]) => {
      if (updatedRows === 0) {
        res.status(404).json({ message: 'No Product found with this id' });
        return null;
      }
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      if (!productTags) {
        return;
      }

      if (!tagIds) {
        return Product.findByPk(req.params.id, {
          include: [
            { model: Category, attributes: ['id', 'category_name'] },
            { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' },
          ],
        });
      }

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }));
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]).then(() =>
        Product.findByPk(req.params.id, {
          include: [
            { model: Category, attributes: ['id', 'category_name'] },
            { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' },
          ],
        })
      );
    })
    .then((updatedProduct) => {
      if (updatedProduct) {
        res.json(updatedProduct);
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


//DELETE 
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(dbProductData => {
    if(!dbProductData){
      res.status(404).json({ message: "No Product found with this id" });
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }) 
});

module.exports = router;