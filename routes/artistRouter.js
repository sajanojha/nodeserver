/* This router get the information about artists from all the museums*/
/* The datastring variable is a SPARQL query */

const express = require('express');
const router = express.Router();
// Get the configuration options like header file and museum URLS
const configoptions = require('../config.json');
// include http request function that fetch the data via HTTP(s) request
const fetchDataFromEndPoint = require('./fetchDataFromEndPoint.js');
const jsonld = require('jsonld');
const jsonPrimer = require('../primer/linked-art.json');

let options = { method: 'POST',
    url: configoptions.url,
    headers: configoptions.headers};



/*get all the manmade objects  */
// rdf:type  crm:E39_Actor for all the actors.
router.get('/', function(req, res, next) {
    console.log("this is working");
    const offSet = req.query.offset;
    const limit = req.query.limit;
    let dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
        '\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
        '\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>' +
        '\nSELECT DISTINCT ?sub ?name WHERE {\n  ?sub rdf:type  crm:E39_Actor.' +
        '\n  ?sub rdfs:label ?name\n  \n}\nORDER BY (LCASE(?name)) ' +
        '\nLIMIT' + limit + '\n OFFSET ' + offSet;

    options.form =  { query:  dataString } ;

    fetchDataFromEndPoint.getData(options, function(err, results) {
        if (err) {
            console.log(err.stack);
            return res.status(500);
        }
        res.json(results);
    });
});


module.exports = router;