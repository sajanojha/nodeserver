/* This router get the information about all the museums */
/* The datastring variable is a SPARQL query */

const express = require('express');
const router = express.Router();
// Get the configuration options like header file and museum URLS
const configoptions = require('../config.json');
// include http request function that fetch the dtaa via HTTP(s) request
const fetchDataFromEndPoint = require('./fetchDataFromEndPoint.js');

let options = { method: 'POST',
  url: configoptions.url,
  headers: configoptions.headers};


/* GET all the museums. */
// rdf:type  crm:E40_Legal_Body . fetches all the legal organization
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

/*get all the manmade objects per museums */
// rdf:type  crm:E22_Man-Made_Object fetches all the objects per museum.
//configoptions.museums[institutionURL].globalURL  stores the name of the particular museum
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

/*get all the artist  per museums */
// rdf:type  crm:E39_Actor for all the artists per museum.
//configoptions.museums[institutionURL].globalURL  stores the name of the particular museum
router.get('/actors/institution/:institution', function(req, res, next) {
  let institutionURL = req.params.institution;
  const offSet = req.query.offset;
  const limit = req.query.limit;
  let dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
      '\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
      '\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>' +
      '\nSELECT DISTINCT ?sub ?name WHERE {\n    graph <' + configoptions.museums[institutionURL].globalURL +'>' +
      '\n  {\n  ?sub rdf:type  crm:E39_Actor.' +
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