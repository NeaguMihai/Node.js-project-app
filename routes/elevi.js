var express = require('express');
var eleviController = require('../controllers/elevController');
var router = express.Router();

router.get('/search', eleviController.returnSearch); 

router.get('/api/search/(:id)', eleviController.returnEleviWithout);

router.get('/api/search/pentrutema/(:id)', eleviController.returnEleviPentruTema);

router.get('/sterge/(:id)', eleviController.deleteRequest);

router.get('/elevnou', eleviController.insertRequest)

router.get('/(:id)/update', eleviController.updateRequest)

router.post('/(:id)/update', eleviController.updateProcess)

router.post('/elevnou',eleviController.insertProcess);

module.exports = router;