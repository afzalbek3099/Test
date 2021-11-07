var express = require('express');
var router = express.Router();
const Phones = require('../models/Phones')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const phones = await Phones.find()
  console.log(phones);

  res.render('index',
   { title: 'Express', phones ,
  //  layout: 'layout'
  });
});

module.exports = router;
