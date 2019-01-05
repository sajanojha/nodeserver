const express = require('express');
const router = express.Router();
const configoptions = require('../config.json');
// include http request function that fetch the dtaa via HTTP(s) request
const fetchDataFromEndPoint = require('./fetchDataFromEndPoint.js');

let options = { method: 'POST',
    url: configoptions.url,
    headers: configoptions.headers};


/* GET count of all the man made objects. */
router.get('/', function(req, res, next) {
    const queryParam= req.query.term;
    const dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>\nSELECT ?sub ?Artifactname ?actorName ?owner WHERE {\n  ?sub rdf:type  crm:E22_Man-Made_Object.\n  ?sub rdfs:label ?Artifactname.\n  ?sub crm:P108i_was_produced_by ?production.\n ?production crm:P14_carried_out_by ?actor.\n ?actor rdfs:label ?actorName.\n ?sub crm:P52_has_current_owner ?owner.\n ?owner rdfs:label ?musuemName.\nFILTER regex(?Artifactname, "' + queryParam +'","i")\n } \nLIMIT 10';
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
