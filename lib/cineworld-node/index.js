var VERSION = '0.1.0',
    request = require('request');

function merge(obj1, obj2) {
  obj1 = obj1 || {};
  if (obj2 && typeof obj2 === 'object') {
    var keys = Object.keys(obj2);
    for (var i = 0, len = keys.length; i < len; i++) {
      var k = keys[i];
      if (obj2[k] !== undefined) obj1[k] = obj2[k];
    }
  }
  return obj1;
}

function CineWorld(key) {
  this.key = key;

  this.cineworldBaseUrl = 'http://www.cineworld.com/api/';
}
CineWorld.VERSION = VERSION;
module.exports = CineWorld;


CineWorld.prototype.get = function(url, params, callback) {
  // checking args
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if (typeof callback !== 'function') {
    throw "Incalid Callback";
    return this;
  }

  // building request
  var url = this.cineworldBaseUrl + url,
      requestParams = merge(params, {key: this.key}),
      requestOptions = {
        url: url,
        qs: requestParams,
        json: true
      };

  // making request
  request(requestOptions, function(error, res, body) {
        callback(error, res, body);
    });
  
 return this;
}


CineWorld.prototype.cinemas = function(params, callback) {
  return this.get('quickbook/cinemas', params, callback);
}

CineWorld.prototype.films = function(params, callback) {
  return this.get('quickbook/films', params, callback);
}

CineWorld.prototype.dates = function(params, callback) {
  return this.get('quickbook/dates', params, callback);
}

CineWorld.prototype.performances = function(params, callback) {
  return this.get('quickbook/performances', params, callback);
}

CineWorld.prototype.categories = function(callback) {
  return this.get('categories', callback);
}

CineWorld.prototype.events = function(callback) {
  return this.get('events', callback);
}

CineWorld.prototype.distributors = function(callback) {
  return this.get('distributors', callback);
}