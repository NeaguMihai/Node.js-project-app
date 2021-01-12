var express = require('express');
var temeController = require('../controllers/temeController');
var router = express.Router();

router.get('/search', temeController.returnSearch);

router.get('/api/search/(:id)', temeController.returnTemaWithoutElev); 

router.get('/api/search/pentruelev/(:id)', temeController.returnTemePentruElev);

router.get('/sterge/(:id)', temeController.deleteRequest);

router.get('/temanoua', temeController.insertRequest);

router.post('/temanoua', temeController.insertProcess);

router.get('/(:id)/update', temeController.updateRequest)

router.post('/(:id)/update', temeController.updateProcess)


module.exports = router;
