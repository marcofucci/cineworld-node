var CINEWORLD_KEY = 'my-key';
var gently = global.GENTLY = new (require('gently')),
    cineworld = new (require('../lib/cineworld'))(CINEWORLD_KEY),
    assert = require('assert');


describe('Cineworld config', function() {
    it('has key properly set', function() {
      assert.equal(cineworld.key, CINEWORLD_KEY);
    });
});


describe('request API call', function() {
    it('throws error if callback not specified', function() {
      var func = 
      assert.throws(
          function() { cineworld.get('my-url/'); },
          Error, "Invalid Callback"
        );
    });

    it('makes get request with params properly set', function() {
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/my-url');
        assert.equal(options.qs.key, CINEWORLD_KEY);
        assert.equal(options.json, true);
        
        callback(null, null, null);
      });

      cineworld.get('my-url', function(error, res, json) {});
    });

    it('makes get request with query string', function() {
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/my-url');
        assert.equal(options.qs.key, CINEWORLD_KEY);
        assert.equal(options.qs.full, true);
        assert.equal(options.json, true);
        
        callback(null, null, null);
      });

      cineworld.get('my-url', { full: true}, function(error, res, json) {});
    });
});


describe('other API call', function() {
    it('returns cinemas', function() {
      var jsonRes = {
        "cinemas": [
          {
              "id": 1,
              "name": "Aberdeen - Queens Links",
              "cinema_url": "http://www.cineworld.co.uk/cinemas/1"
          },
          {
              "id": 78,
              "name": "Aberdeen - Union Square",
              "cinema_url": "http://www.cineworld.co.uk/cinemas/78"
          },
          {
              "id": 87,
              "name": "Aldershot",
              "cinema_url": "http://www.cineworld.co.uk/cinemas/87"
          }
        ]
      };
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/quickbook/cinemas');
        callback(null, null, jsonRes);
      });

      cineworld.cinemas(function(error, res, json) {
        assert.equal(json, jsonRes);
      });
    });

    it('returns films', function() {
      var jsonRes = {
        "films": [
          {
              "edi": 106138,
              "title": "IMAX - Skyfall"
          },
          {
              "edi": 42873,
              "title": "Skyfall"
          },
          {
              "edi": 41752,
              "title": "Killing Them Softly"
          }
        ]
      };
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/quickbook/films');
        callback(null, null, jsonRes);
      });

      cineworld.films(function(error, res, json) {
        assert.equal(json, jsonRes);
      });
    });

    it('returns dates', function() {
      var jsonRes = {
        "dates": [
          "20120928",
          "20120929",
          "20120930",
          "20121001",
          "20121002",
          "20121003",
          "20121004"
        ]
      };
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/quickbook/dates');
        callback(null, null, jsonRes);
      });

      cineworld.dates(function(error, res, json) {
        assert.equal(json, jsonRes);
      });
    });

    it('returns performances', function() {
      var jsonRes = {
        "performances": [
            {
                "time": "12:15",
                "available": true,
                "type": "reg",
                "ad": false,
                "subtitled": false,
                "ss": false,
                "booking_url": "http://www.cineworld.co.uk/booking?performance=5086129&key=my-key"
            },
            {
                "time": "15:00",
                "available": true,
                "type": "reg",
                "ad": false,
                "subtitled": false,
                "ss": false,
                "booking_url": "http://www.cineworld.co.uk/booking?performance=5086138&key=my-key"
            },
            {
                "time": "17:45",
                "available": true,
                "type": "reg",
                "ad": false,
                "subtitled": false,
                "ss": false,
                "booking_url": "http://www.cineworld.co.uk/booking?performance=5086147&key=my-key"
            },
            {
                "time": "20:30",
                "available": true,
                "type": "reg",
                "ad": false,
                "subtitled": false,
                "ss": false,
                "booking_url": "http://www.cineworld.co.uk/booking?performance=5086159&key=my-key"
            }
        ],
        "legends": [
            {
                "code": "reg",
                "description": "Regular"
            }
        ]
      };
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/quickbook/performances');
        callback(null, null, jsonRes);
      });

      cineworld.performances({film: 56799, cinema: 1, date: 20121002}, function(error, res, json) {
        assert.equal(json, jsonRes);
      });
    });

    it('returns categories', function() {
      var jsonRes = {
        "categories": [
            {
                "code": "junior",
                "name": "Movies for Juniors"
            },
            {
                "code": "family",
                "name": "Family Films"
            },
            {
                "code": "bollywood",
                "name": "Bollywood"
            }
        ]
      };
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/categories');
        callback(null, null, jsonRes);
      });

      cineworld.categories(function(error, res, json) {
        assert.equal(json, jsonRes);
      });
    });

    it('returns events', function() {
      var jsonRes = {
        "events": [
            {
                "code": "metopera",
                "name": "MET Opera"
            },
            {
                "code": "Ntlive",
                "name": "National Theatre"
            },
            {
                "code": "LIFF",
                "name": "London Indian Film Festival"
            },
            {
                "code": "ROH",
                "name": "Royal Opera House"
            },
            {
                "code": "CFF",
                "name": "Chichester Film Festival"
            },
            {
                "code": "ringcycle",
                "name": "The Met Opera Ring Cycle"
            },
            {
                "code": "Glyndebourne",
                "name": "Glyndebourne Season "
            },
            {
                "code": "Olympics",
                "name": "London 2012 Olympics"
            },
            {
                "code": "JFF",
                "name": "UK Jewish Film Festival"
            }
        ]
      };
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/events');
        callback(null, null, jsonRes);
      });

      cineworld.events(function(error, res, json) {
        assert.equal(json, jsonRes);
      });
    });

    it('returns distributors', function() {
      var jsonRes = {
        "distributors": [
            {
                "id": "1",
                "name": "Distributor 1"
            },
            {
                "id": "2",
                "name": "Distributor 2"
            }
        ]
      };
      gently.expect(gently.hijacked.request, 'get', function(options, callback) {
        assert.equal(options.url, 'http://www.cineworld.com/api/distributors');
        callback(null, null, jsonRes);
      });

      cineworld.distributors(function(error, res, json) {
        assert.equal(json, jsonRes);
      });
    });
});