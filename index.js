'use strict';
var cheerio = require('cheerio');
var he = require('he');
var hl = require('highlight.js');
var highlightAuto = hl.highlightAuto;
var highlight = hl.highlight;


module.exports = function(input) {
    this.cacheable();

    var $ = cheerio.load(input);

    $('code').replaceWith(function(i, e) {
        var $e = $(e);
        var text = $e.text();

        if(text.split('\n').length < 2) {
          return $('<code>' + he.encode(text) + '</code>');
        }

        var text = $e.text();
        var klass = $e.attr('class') || '';
        var lang = klass.split('lang-').filter(id);
        lang = lang && lang[0];

        if(lang) {
            return highlight(lang, text).value;
        }

        return highlightAuto(text).value;
    });

    $('pre').addClass('hljs');

    return $.html();
};

function id(a) {return a;}
