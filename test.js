const assert = require('assert');
const assign = require('object-assign');
const loader = require('./');

const webpackContext = {
  cacheable: noop,
  exec: noop
};
const highlight = loader.bind(webpackContext);

describe('highlight-loader', function () {
  it('should highlight code', function () {
    const code = '<code>run &lt;script&gt;</code>';
    const given = highlight(code);
    const expected = '<code>run &lt;script&gt;</code>';

    assert.equal(given, expected);
  });

  it('should highlight pre/code', function () {
    const code = '<pre><code class="lang-javascript">var a = 4;\n' +
      'console.log(a + 5);\n</code></pre>';
    const given = highlight(code);
    const expected = '<pre class="hljs"><span class="hljs-keyword">var</span> a = <span class="hljs-number">4</span>;\n' +
      '<span class="hljs-built_in">console</span>.log(a + <span class="hljs-number">5</span>);\n' +
      '</pre>';

    assert.equal(given, expected);
  });

  it('should not fail with empty input', function () {
    const given = highlight();
    const expected = '';

    assert.equal(given, expected);
  });

  it('should support raw output', function () {
    const code = 'demo';
    const given = loader.call(assign({}, webpackContext, {
      query: '?raw=true'
    }), code);
    const expected = 'module.exports = "<span class=\\"hljs-built_in\\">demo</span>"';

    assert.equal(given, expected);
  });

  it('should support raw output with lang', function () {
    const code = 'a = 4';
    const given = loader.call(assign({}, webpackContext, {
      query: '?raw=true&lang=python'
    }), code);
    const expected = 'module.exports = "a = <span class=\\"hljs-number\\">4</span>"';

    assert.equal(given, expected);
  });

  it('should support exec', function () {
    var executed = false;
    const code = 'demo';
    const given = loader.call(assign({}, webpackContext, {
      exec: function(input) {
        executed = true;

        return input;
      },
      query: '?exec=true'
    }), code);
    const expected = 'demo';

    assert.equal(executed, true);
    assert.equal(given, expected);
  });
});

function noop() {}
