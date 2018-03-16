var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:numberplate', function(req, res, next) {
    res.json({
        numberplate: 'FY06 KFC',
        location: {
            'longitude': 51.300000,
            'latitude': 54.6789000
        }
    });
});

router.post('/:numberplate', function(req, res, next) {
    res.json({saved: "it"});
});

module.exports = router;
