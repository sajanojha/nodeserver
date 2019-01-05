/* This router get the information about artists from all the museums*/
/* The datastring variable is a SPARQL query */

const express = require('express');
const router = express.Router();
// Get the configuration options like header file and museum URLS
const configoptions = require('../config.json');
// include http request function that fetch the dtaa via HTTP(s) request
const fetchDataFromEndPoint = require('./fetchDataFromEndPoint.js');
const jsonld = require('jsonld');
const jsonPrimer = require('../primer/linked-art.json');

let options = { method: 'POST',
    url: configoptions.url,
    headers: configoptions.headers};


router.get('/', function(req, res, next) {
    const offSet = req.query.offset;
    const limit = req.query.limit;

    const dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
        '\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
        '\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>' +
        '\nPrefix skos: <http://www.w3.org/2004/02/skos/core#>' +
        '\nSELECT distinct  ?exactmatch ?sub ?name WHERE {' +
        '\n  ?sub rdf:type  crm:E39_Actor.' +
        '\n  ?sub rdfs:label ?name.' +
        '\n  ?sub skos:exactMatch ?exactmatch.' +
        '\n} ' +
        '\nORDER BY (LCASE(?name))' +
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

//get all influenced actors
router.get('/getinfluenced/artist/:artist', function(req, res, next){
    const artist = req.params.artist;

    let dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
        '\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
        '\nPREFIX daa: <http://data.americanartcollaborative.org#>' +
        '\nPREFIX cs: <http://purl.org/vocab/changeset/schema#>' +
        '\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>' +
        '\nPREFIX crmeh: <http://purl.org/crmeh#>' +
        '\nPREFIX ecrm: <http://erlangen-crm.org/current/>' +
        '\nPREFIX ecrm: <http://erlangen-crm.org/current/>' +
        '\nPREFIX la_vocabs: <http://linkedarc.net/vocabs/>' +
        '\nPREFIX re: <http://www.w3.org/2000/10/swap/reason#>' +
        '\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>' +
        '\nPREFIX fo: <http://www.w3.org/1999/XSL/Format#>' +
        '\nPREFIX dct: <http://purl.org/dc/terms/>' +
        '\nPREFIX dbo: <http://dbpedia.org/ontology/>' +
        '\nPREFIX dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#>' +
        '\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>' +
        '\nPREFIX dbp: <http://dbpedia.org/property/>' +
        '\nPREFIX dbc: <http://dbpedia.org/resource/Category:>' +
        '\nPREFIX db: <http://dbpedia.org/>' +
        '\nPREFIX owl: <http://www.w3.org/2002/07/owl#>' +
        '\nPREFIX wikidata: <https://www.wikidata.org/wiki>' +
        '\n\nSELECT  DISTINCT ?sub ?obj ?influencedPerson WHERE {' +
        '\n     ?sub rdf:type foaf:Person.' +
        '\n     ?sub foaf:name ?PersonName.' +
        '\n     ?sub dbo:influenced|^dbo:influenced ?obj.' +
        '\n     ?obj foaf:name ?influencedPerson.' +
        '\n     Filter regex(?PersonName, "' + artist + '", "i" )' +
        '\n    }\n';
    options.form =  { query:  dataString } ;
    options.url = "http://dbpedia.org/sparql";
    options.headers["content-type"] = "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW";

    fetchDataFromEndPoint.getData(options, function(err, results) {
        if (err) {
            console.log(err.stack);
            return res.status(500);
        }
        res.json(results);
    });



});

//get all influenced by actors
router.get('/getinfluencedby/artist/:artist', function(req, res, next){
    const artist = req.params.artist;

    let dataString = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
        '\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +
        '\nPREFIX daa: <http://data.americanartcollaborative.org#>' +
        '\nPREFIX cs: <http://purl.org/vocab/changeset/schema#>' +
        '\nPREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>' +
        '\nPREFIX crmeh: <http://purl.org/crmeh#>' +
        '\nPREFIX ecrm: <http://erlangen-crm.org/current/>' +
        '\nPREFIX ecrm: <http://erlangen-crm.org/current/>' +
        '\nPREFIX la_vocabs: <http://linkedarc.net/vocabs/>' +
        '\nPREFIX re: <http://www.w3.org/2000/10/swap/reason#>' +
        '\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>' +
        '\nPREFIX fo: <http://www.w3.org/1999/XSL/Format#>' +
        '\nPREFIX dct: <http://purl.org/dc/terms/>' +
        '\nPREFIX dbo: <http://dbpedia.org/ontology/>' +
        '\nPREFIX dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#>' +
        '\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>' +
        '\nPREFIX dbp: <http://dbpedia.org/property/>' +
        '\nPREFIX dbc: <http://dbpedia.org/resource/Category:>' +
        '\nPREFIX db: <http://dbpedia.org/>' +
        '\nPREFIX owl: <http://www.w3.org/2002/07/owl#>' +
        '\nPREFIX wikidata: <https://www.wikidata.org/wiki>' +
        '\n\nSELECT  DISTINCT ?sub  ?influencedByPerson ?influencedByPersonName WHERE {' +
        '\n     ?sub foaf:name ?PersonName.' +
        '\n     ?sub dbo:influencedBy|^dbo:influencedBy ?influencedByPerson. ' +
        '\n     ?influencedByPerson foaf:name ?influencedByPersonName.' +
        '\n     Filter regex(?PersonName, "' + artist + '", "i" ) \n}\n';
    options.form =  { query:  dataString } ;
    options.url = "http://dbpedia.org/sparql";
    options.headers["content-type"] = "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW";

    fetchDataFromEndPoint.getData(options, function(err, results) {
        if (err) {
            console.log(err.stack);
            return res.status(500);
        }
        res.json(results);
    });



});

router.get('/institution/:institution/id/:id', function(req, res, next){
    const institution = req.params.institution;
    const oid = req.params.id;
    const urlVar = configoptions.museums[institution].artistURL+ oid;
    let dataString = 'PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX dc: <http://purl.org/dc/elements/1.1/>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX schema: <http://schema.org/>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n\nCONSTRUCT {\n\n   ?entity_uri a ?actor_type, crm:E39_Actor ;\n      rdfs:label                  ?label ;\n      dc:description              ?description ;\n      crm:P2_has_type             ?gender_class ;\n      skos:exactMatch             ?lod_identifier;\n      crm:P1_is_identified_by     ?actor_id_class ;\n      crm:P131_is_identified_by   ?actor_name_class ;\n      foaf:homepage               ?website_url ;\n      crm:P129i_is_subject_of     ?description_class ;\n      foaf:page                   ?alt_website_url ;\n      crm:P138i_has_representation               ?image ;\n      crm:P92i_was_brought_into_existence_by     ?birth_event;\n      crm:P93i_was_taken_out_of_existence_by     ?death_event;\n      crm:P107i_is_current_or_former_member_of   ?nationality_class .\n\n\n\n    ######### NAME #########\n    ?actor_name_class a crm:E82_Actor_Appellation ;\n      crm:P2_has_type ?actor_name_type ;\n      crm:P106_is_composed_of ?given_name_class ;\n      crm:P106_is_composed_of ?family_name_class ;\n      crm:P106_is_composed_of ?middle_name_class ;\n      crm:P106_is_composed_of ?name_prefix_class ;\n      crm:P106_is_composed_of ?name_suffix_class ;\n      rdf:value ?actor_name .\n\n    ######### BIRTH #########\n    ?birth_event a crm:E63_Beginning_of_Existence;\n        crm:P4_has_time-span ?birth_timespan ;\n        crm:P7_took_place_at ?birth_location_class .\n    ?birth_timespan a crm:E52_Time-Span;\n        crm:P82a_begin_of_the_begin ?earliest_birthdate;\n        crm:P82b_end_of_the_end ?latest_birthdate;\n        rdfs:label ?display_birthdate.\n    ?birth_location_class a crm:E53_Place;\n        rdfs:label ?birth_location.\n\n    ######### DEATH #########\n    ?death_event a crm:E64_End_of_Existence;\n        crm:P4_has_time-span ?death_timespan ;\n        crm:P7_took_place_at ?death_location_class .\n    ?death_timespan a crm:E52_Time-Span;\n        crm:P82a_begin_of_the_begin ?earliest_deathdate;\n        crm:P82b_end_of_the_end ?latest_deathdate;\n        rdfs:label ?display_deathdate.\n    ?death_location_class a crm:E53_Place;\n        rdfs:label ?death_location.\n\n\n    ######### RECONCILED IDS ########\n    ?lod_identifier skos:preflabel ?lod_label;\n      schema:url    ?lod_reference;\n      skos:inScheme ?lod_source.\n\n    ######### GIVEN NAME ##########\n    ?given_name_class a crm:E82_Actor_Appellation ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300404651> ; # note that this is a modification from the spec\n      rdf:value ?given_name .\n\n    ######### FAMILY NAME #########\n    ?family_name_class a crm:E82_Actor_Appellation ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300404652> ; # note that this is a modification from the spec\n      rdf:value ?family_name  .\n\n    ######### MIDDLE NAME #########\n    ?middle_name_class a crm:E82_Actor_Appellation ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300404654> ; # note that this is a modification from the spec\n      rdf:value ?middle_name  .\n\n    ######### NAME PREFIX #########\n    ?name_prefix_class a crm:E82_Actor_Appellation ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300404845> ; # note that this is a modification from the spec\n      rdf:value ?name_prefix  .\n\n    ######### NAME SUFFIX #########\n    ?name_suffix_class a crm:E82_Actor_Appellation ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300404662> ; # note that this is a modification from the spec\n      rdf:value ?name_suffix  .\n\n    ######### IDS #########\n    ?actor_id_class a crm:E42_Identifier ;\n      rdfs:label ?identifier ;\n      rdf:value  ?identifier ;\n      crm:P2_has_type ?identifier_type .\n    ?identifier_type skos:prefLabel ?identifier_type_label.\n\n    ######### WEBSITES #########\n    ?website_url rdfs:label ?website_label.\n    ?alt_website_url rdfs:label ?alt_website_label ;\n      foaf:maker ?alt_website_source.\n    ?alt_website_source foaf:name ?alt_website_author.\n\n    ######### GENDER #########\n    ?gender_class a crm:E55_Type ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300055147> ;\n      rdfs:label ?gender .\n\n    ######### NATIONALITY #########\n    ?nationality_class a crm:E74_Group ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300379842> ;\n      rdfs:label ?nationality .\n\n    ######### BIOGRAPHY ##########\n    ?description_class a crm:E33_Linguistic_Object ;\n      rdf:value ?description ;\n      crm:P94i_was_created_by ?authorship_event ;\n      crm:P2_has_type ?description_type .\n    ?authorship_event a crm:E65_Creation ;\n      crm:P14_carried_out_by ?author_class .\n    ?author_class a crm:E39_Actor ;\n      rdfs:label ?author.\n\n    ######## IMAGE ########\n    ?image a crm:E38_Image ;\n      rdfs:label ?image_description ;\n      crm:P67i_is_referred_to_by ?image_rights_statement_class ;\n      crm:P104_is_subject_to ?image_right .\n    ?image_right a crm:E30_Right .\n    ?image_rights_statement_class a crm:E33_Linguistic_Object ;\n      crm:P2_has_type <http://vocab.getty.edu/aat/300055547> ;\n      rdf:value ?image_rights_statement .\n\n}\nWHERE \n{\n\n  VALUES ?entity_uri { <' + urlVar + '> }\n\n  ######### CIDOC TYPE #########\n    ?entity_uri a ?actor_type.\n    {?entity_uri a <http://www.cidoc-crm.org/cidoc-crm/E39_Actor>} UNION\n    {?entity_uri a <http://www.cidoc-crm.org/cidoc-crm/E21_Person>} UNION\n    {?entity_uri a <http://www.cidoc-crm.org/cidoc-crm/E74_Group>} UNION\n    {?entity_uri a <http://www.cidoc-crm.org/cidoc-crm/E40_Legal_Body>}\n\n    ######### LABEL #########\n    OPTIONAL {\n      ?entity_uri rdfs:label ?label .\n    }\n\n    ######### RECONCILED IDS ########\n    OPTIONAL {\n      ?entity_uri skos:exactMatch ?lod_identifier.\n      OPTIONAL {\n        ?lod_identifier skos:preflabel ?lod_label.\n      }\n      OPTIONAL {\n        ?lod_identifier skos:inScheme ?lod_source.\n      }\n      OPTIONAL {\n        ?lod_identifier schema:url ?lod_reference.\n      }\n    }\n\n    ######### NAME #########\n    OPTIONAL {\n       ?entity_uri crm:P131_is_identified_by ?actor_name_class .\n       ?actor_name_class a crm:E82_Actor_Appellation ;\n         crm:P2_has_type ?actor_name_type ;\n         rdf:value ?actor_name .\n\n      ######### GIVEN NAME #########\n      OPTIONAL {\n        ?actor_name_class crm:P106_is_composed_of ?given_name_class .\n        ?given_name_class a crm:E82_Actor_Appellation ;\n          rdf:value ?given_name .\n        {\n          ?given_name_class crm:P2_has_type <http://vocab.getty.edu/aat/300404651> .\n        } UNION {\n          ?given_name_class crm:P2_has_type ?given_name_type_class .\n          ?given_name_type_class skos:broadMatch <http://vocab.getty.edu/aat/300404651> .\n        }\n      }\n\n      ######### FAMILY NAME #########\n      OPTIONAL {\n        ?actor_name_class crm:P106_is_composed_of ?family_name_class .\n        ?family_name_class a crm:E82_Actor_Appellation ;\n          rdf:value ?family_name .\n        {\n          ?family_name_class crm:P2_has_type <http://vocab.getty.edu/aat/300404652> .\n        } UNION {\n          ?family_name_class crm:P2_has_type ?family_name_type_class .\n          ?family_name_type_class skos:broadMatch <http://vocab.getty.edu/aat/300404652> .\n        }\n      }\n\n      ######### MIDDLE NAME #########\n      OPTIONAL {\n        ?actor_name_class crm:P106_is_composed_of ?middle_name_class .\n        ?middle_name_class a crm:E82_Actor_Appellation ;\n          rdf:value ?middle_name .\n        {\n          ?middle_name_class crm:P2_has_type <http://vocab.getty.edu/aat/300404654> .\n        } UNION {\n          ?middle_name_class crm:P2_has_type ?middle_name_type_class .\n          ?middle_name_type_class skos:broadMatch <http://vocab.getty.edu/aat/300404654> .\n        }\n      }\n\n      ######### NAME PREFIX #########\n      OPTIONAL {\n        ?actor_name_class crm:P106_is_composed_of ?name_prefix_class .\n        ?name_prefix_class a crm:E82_Actor_Appellation ;\n          rdf:value ?name_prefix .\n        {\n          ?name_prefix_class crm:P2_has_type <http://vocab.getty.edu/aat/300404845> .\n        } UNION {\n          ?name_prefix_class crm:P2_has_type ?name_prefix_type_class .\n          ?name_prefix_type_class skos:broadMatch <http://vocab.getty.edu/aat/300404845> .\n        }\n      }\n\n      ######### NAME SUFFIX #########\n      OPTIONAL {\n        ?actor_name_class crm:P106_is_composed_of ?name_suffix_class .\n        ?name_suffix_class a crm:E82_Actor_Appellation ;\n          rdf:value ?name_suffix .\n        {\n          ?name_suffix_class crm:P2_has_type <http://vocab.getty.edu/aat/300404662> .\n        } UNION {\n          ?name_suffix_class crm:P2_has_type ?name_suffix_type_class .\n          ?name_suffix_type_class skos:broadMatch <http://vocab.getty.edu/aat/300404662> .\n        }\n      }\n    }\n\n    ######### IDS #########\n    OPTIONAL {\n      ?entity_uri crm:P1_is_identified_by ?actor_id_class .\n      ?actor_id_class a crm:E42_Identifier ;\n        rdf:value ?identifier .\n      OPTIONAL {\n        ?actor_id_class crm:P2_has_type ?identifier_type .\n        OPTIONAL {\n         ?identifier_type skos:prefLabel ?identifier_type_label .\n        } \n      }\n    }\n\n    ####### HOMEPAGE #######\n    OPTIONAL {\n      ?entity_uri foaf:homepage ?website_url .\n      OPTIONAL {\n        ?website_url rdfs:label ?website_label.\n      }\n    }\n\n    ####### OTHER WEBSITES #######\n    OPTIONAL {\n      ?entity_uri foaf:page ?alt_website_url .\n      ?alt_website_url rdfs:label ?alt_website_label .\n      OPTIONAL {\n        ?alt_website_url foaf:maker ?alt_website_source.\n        ?alt_website_source foaf:name ?alt_website_author.  \n      }\n    }\n\n    ######### GENDER #########\n    OPTIONAL {\n      ?entity_uri crm:P2_has_type ?gender_class .\n      ?gender_class a crm:E55_Type ;\n        rdfs:label ?gender .\n      {\n        ?gender_class crm:P2_has_type <http://vocab.getty.edu/aat/300055147> .\n      } UNION {\n        ?gender_class crm:P2_has_type ?gender_type_class .\n        ?gender_type_class a crm:E55_Type ;\n          skos:broadMatch <http://vocab.getty.edu/aat/300055147> .\n        OPTIONAL {?gender_type_class skos:prefLabel ?gender_type. }\n      }\n    }\n\n    ######### NATIONALITY #########\n    OPTIONAL {\n      ?entity_uri crm:P107i_is_current_or_former_member_of ?nationality_class .\n      ?nationality_class a crm:E74_Group ;\n        rdfs:label ?nationality ;\n        crm:P2_has_type <http://vocab.getty.edu/aat/300379842> .\n    }\n\n    ######### BIOGRAPHY ##########\n    OPTIONAL {\n      ?entity_uri crm:P129i_is_subject_of ?description_class .\n      ?description_class a crm:E33_Linguistic_Object ;\n        crm:P2_has_type ?description_type ;\n        rdf:value ?description .\n      OPTIONAL {\n        ?description_class crm:P94i_was_created_by ?authorship_event .\n        ?authorship_event a crm:E65_Creation ;\n          crm:P14_carried_out_by ?author_class .\n        OPTIONAL {\n          ?author_class rdfs:label ?author .\n        }\n      }\n    }\n\n    ######### BIRTH #########\n    OPTIONAL {\n      ?entity_uri crm:P92i_was_brought_into_existence_by ?birth_event.\n      ?birth_event a crm:E63_Beginning_of_Existence.\n      OPTIONAL {\n          ?birth_event crm:P4_has_time-span ?birth_timespan.\n          ?birth_timespan a crm:E52_Time-Span;\n            crm:P82a_begin_of_the_begin ?earliest_birthdate;\n            crm:P82b_end_of_the_end ?latest_birthdate.\n          OPTIONAL { ?birth_timespan rdfs:label ?display_birthdate.}\n      }\n      OPTIONAL {\n        ?birth_event crm:P7_took_place_at ?birth_location_class .\n        OPTIONAL {\n          ?birth_location_class a crm:E53_Place;\n            rdfs:label ?birth_location.\n        }\n      }\n    }\n\n    ######### DEATH #########\n    OPTIONAL {\n      ?entity_uri crm:P93i_was_taken_out_of_existence_by ?death_event.\n      ?death_event a crm:E64_End_of_Existence.\n      OPTIONAL { \n        ?death_event crm:P4_has_time-span ?death_timespan.\n        ?death_timespan a crm:E52_Time-Span;\n              crm:P82a_begin_of_the_begin ?earliest_deathdate;\n              crm:P82b_end_of_the_end ?latest_deathdate;\n        OPTIONAL { ?death_timespan rdfs:label ?display_deathdate.}\n      }\n      OPTIONAL {\n        ?death_event crm:P7_took_place_at ?death_location_class .\n        OPTIONAL {\n          ?death_location_class a crm:E53_Place;\n                    rdfs:label ?death_location.\n        }\n      }\n    }\n\n    ######## IMAGE ########\n    OPTIONAL {\n      ?entity_uri crm:P138i_has_representation ?image .\n      ?image a crm:E38_Image .\n      OPTIONAL {\n        ?image rdfs:label ?image_description .\n      }\n      OPTIONAL {\n        ?image crm:P104_is_subject_to ?image_right .\n      }\n      OPTIONAL {\n        ?image crm:P67i_is_referred_to_by ?image_rights_statement_class .\n        ?rights_statement_class a crm:E33_Linguistic_Object ;\n          crm:P2_has_type <http://vocab.getty.edu/aat/300055547> ;\n          rdf:value ?image_rights_statement .\n      }\n    }\n}';
    options.headers.accept = "application/ld+json";
    options.form =  { query:  dataString } ;

    fetchDataFromEndPoint.getData(options, function(err, results) {
        if (err) {
            console.log(err.stack);
            return res.status(500);
        }
        // Used JSON Primer to compact the JSON
        jsonld.compact(results, jsonPrimer, function(err, compacted) {
            //res.json(compacted);
            //compacted.musuem = "apple";
            res.json(compacted);


        }); //pack the JSON accroding to the context of
    });

});

module.exports = router;
