const e = require('express');
var express = require('express');
var elevTemaController = require('../controllers/elevTemaController');
var router = express.Router();

router.get('/api/insert/(:id)/(:idTema)', elevTemaController.insertRequest);

router.get('/api/delete/(:id)/(:idTema)', elevTemaController.deleteRequest);


module.exports = router;