const request = require('request');
// make request to the SPARQL Endpoint and get the data back
module.exports = {
  getData : (options, callback) => {
      console.log("************Query String Start**************\n");
      //console.log(options.form.query);
      console.log("\n************Query String End****************\n");
        request(options, function(err, res, body) {
      if (err)
        return callback(err);
      try {
        callback(null, JSON.parse(body));
      } catch (ex) {
        callback(ex);
      }
    });
  }
} // module.export

