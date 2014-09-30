require('util-is');
var util      = require('util');
var request   = require('request');
var validator = require('validator');
var debug     = require('debug')('git-orm-gitstar');


module.exports = function(options) {
  return new Driver(options);
};

// Driver(URL)
// Driver({url : URL, headers : Object })
function Driver(options) {
  if (!this instanceof Driver) {
    return new Driver(options);
  }

  if (util.isString(options)) {
    var url = options;
    options = { url: url };
  }

  if (!util.isObject(options)) {
    throw new Error('Expected URL or options argument');
  }

  if (!validator.isURL(options.url)) {
    throw new Error('Invalid URL: ' + options.url);
  }

  this.url = options.url;

  // remove trailing /'s
  this.url = this.url.replace(/[\/]*$/, '');

  this.headers = util.isObject(options.headers) ? options.headers : {};
  this.headers['User-Agent'] = 'git-orm-gitstar';
}

Driver.prototype.get = function(suff, cb) {
  // replace any //'s
  suff = suff.replace(/[\/]{2,}/g, '/');

  var url = this.url + '/' + suff;

  debug('Fetching: ' + url);

  request({ url: url, headers: this.headers },
    function (err, res, body) {
      if (err) {
        return cb(err);
      }
      try {
        var json = JSON.parse(body)
      } catch (e) {
        return cb('Server did not reply with JSON body');
      }
      // Server not OK
      if (res.statusCode !== 200) {
        var err = json.error || ('Server failed with code ' + res.statusCode);
        return cb(err);
      }
      return cb(null, json);
    });
}
