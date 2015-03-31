'use strict';
var cheerio = require('cheerio');
var hl = require('highlight.js');
var highlightAuto = hl.highlightAuto;
var highlight = hl.highlight;


module.exports = function(input) {
    this.cacheable();

    var $ = cheerio.load(input);

    $('code').replaceWith(function(i, e) {
        var $e = $(e);
        var html = $e.html();
        var klass = $e.attr('class') || '';
        var lang = klass.split('lang-').filter(id);
        lang = lang && lang[0];

        if(lang) {
            return highlight(lang, html).value;
        }

        return highlightAuto(html).value;
    });

    return $.html();
};

function id(a) {return a;}
