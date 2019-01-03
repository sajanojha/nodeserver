const express = require('express');
const router = express.Router();
//const request = require('request');
const configoptions = require('../config.json');
const fetchDataFromEndPoint = require('./fetchDataFromEndPoint.js');

let options = { method: 'POST',
  url: configoptions.url,
  headers: configoptions.headers};


/* GET all the museums. */
router.get('/', function(req, res, next) {

  const dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
                     '\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
                     '\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>' +
                     '\nSELECT ?sub ?name WHERE {' +
                     '\n  ?sub rdf:type  crm:E40_Legal_Body.' +
                     '\n  ?sub rdfs:label ?name.\n  \n} ';
    options.form =  { query:  dataString } ;

  fetchDataFromEndPoint.getData(options, function(err, results) {
    if (err) {
      console.log(err.stack);
      return res.status(500);
    }
    res.json(results);
  });
});

router.get('/manmadeobjects/institution/:institution', function(req, res, next) {
  let institutionURL = req.params.institution;
  const offSet = req.query.offset;
  const limit = req.query.limit;
  let dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
                   '\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
                   '\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>' +
                   '\nSELECT ?sub ?name WHERE {\n    graph <' + configoptions.museums[institutionURL].globalURL +'>' +
                   '\n  {\n  ?sub rdf:type  crm:E22_Man-Made_Object.' +
                   '\n    ?sub rdfs:label ?name.\n  }\n}ORDER BY (LCASE(?name)) ' +
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