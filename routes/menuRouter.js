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

// router.get('/:userID', function(req, res, next) {
//   console.log(req.params);
//   res.json({
//     lattice: [
//       {_id: 1, type: 'Man made objects', url: 'aaa'},
//       {_id: 2, type: 'Artists', url: 'aa'},
//       {_id: 3, type: 'Museums', url: 'a'}
//     ]
//   })
// });

module.exports = router;
