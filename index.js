'use strict';
var cheerio = require('cheerio');
var he = require('he');
var hl = require('highlight.js');
var loaderUtils = require('loader-utils');
var highlightAuto = hl.highlightAuto;
var highlight = hl.highlight;

module.exports = function(input) {
  input = input || '';

  this.cacheable();
  var query = loaderUtils.parseQuery(this.query);

  if(query.exec) {
    input = this.exec(input, this.resource);
  }

  if(query.raw) {
    return 'module.exports = ' + JSON.stringify(highlightCode(input, query.lang));
  }

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

    return highlightCode(text, lang);
  });

  $('pre').addClass('hljs');

  return $.html();
};

function id(a) {return a;}

function highlightCode(code, lang) {
  if(lang) {
    return highlight(lang, code).value;
  }

  return highlightAuto(code).value;
}
