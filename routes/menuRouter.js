var express = require('express');
var router = express.Router();




/* GET lattice listing. */
router.get('/', function(req, res, next) {
    //console.log(req.params);
    res.json({
        lattice: [
            {_id: 1, type: 'Artifacts', url: 'manmadeobjects'},
            {_id: 2, type: 'Artists', url: 'artists'},
            {_id: 3, type: 'Museums', url: 'museums'}
        ]
    })
});



module.exports = router;
