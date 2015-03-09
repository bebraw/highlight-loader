'use strict';
var cheerio = require('cheerio');
var highlight = require('highlight.js').highlightAuto;


module.exports = function(input) {
    this.cacheable();

    var $ = cheerio.load(input);

    $('code').replaceWith(function(i, e) {
        var html = $(e).html();

        return highlight(html).value;
    });

    return $.html();
};
