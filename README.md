# cineworld-node

node.js API for [Cineworld](https://www.cineworld.co.uk/developer).

## Installation

Use NPM:

    npm install cineworld-node

Or from source

    git clone git://github.com/marcofucci/cineworld-node.git
    cd cineworld-node
    npm link

## Usage

    var Cineworld = require('cineworld');
    var cw = new Cineworld('my-key');

    //cinemas
    cw.cinemas(function(err, res, json) {console.log(json);});

    //films
    cw.films(function(err, res, json) {console.log(json);});

    //dates
    cw.dates(function(err, res, json) {console.log(json);});

    //performances
    cw.performances({film:'edi-id', cinema:'cinema-id', date:'date'} function(err, res, json) {console.log(json);});

    //categories
    cw.categories(function(err, res, json) {console.log(json);});

    //events
    cw.events(function(err, res, json) {console.log(json);});

    //distributors
    cw.distributors(function(err, res, json) {console.log(json);});

For the full list of params see: [Cineworld API Documentation](https://www.cineworld.co.uk/developer/api)