const router = requirer('express').Router();
const {Category, Product } = require('../..models');

//api categories

router.get('/', (req, res) => {
    Category.findAll({
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }
        ]
    })
    .then(dbCategory => {
        res.json(dbCategory);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//GET api categories
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }
        ]
    })
    .then(dbCategory => {
        if(!dbCategory) {
            res.status(404).json({ message: "No Category found with this id"});
            return;
        }
        res.json(dbCategory);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//POST

router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCategory => {
        res.json(dbCategory);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//PUT
router.put('/:id', (req, res) => {
    Category.update(
        {
            category_name: req.body.category_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCategory => {
        if(!dbCategory) {
            res.status(404).json({ message: "No Category found with this id"});
            return;
        }
        res.json(dbCategory);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE

router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategory => {
        if(!dbCategory) {
            res.status(404).json({ message: "No Category found with this id"});
            return; 
        }
        res.json(dbCategory);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;