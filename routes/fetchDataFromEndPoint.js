const request = require('request');

// make request to the SPARQL server and get the data back
module.exports = {
  getData: function (options, callback) {
    request(options, function(err, res, body) {
      if (err)
        return callback(err);
      try {
        console.log(JSON.parse(body));
        callback(null, JSON.parse(body));
      } catch (ex) {
        callback(ex);
      }
    });
  }
};

