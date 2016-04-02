const assert = require('assert');
const loader = require('./');

const highlight = loader.bind({
  cacheable: noop,
  exec: noop
});

describe('highlight-loader', function () {
  it('should highlight code', function () {
    const code = '<code>run &lt;script&gt;</code>';
    const given = highlight(code);
    const expected = '<pre class="hljs"><span class="hljs-keyword">var</span> a = <span class="hljs-number">4</span>;<span class="hljs-built_in">console</span>.log(a + <span class="hljs-number">5</span>);</pre>';

    assert(given, expected);
  });

  it('should highlight pre/code', function () {
    const code = '<pre><code class="lang-javascript">var a = 4;\n' +
      'console.log(a + 5);\n</code></pre>';
    const given = highlight(code);
    const expected = '<pre class="hljs"><span class="hljs-keyword">var</span> a = <span class="hljs-number">4</span>;<span class="hljs-built_in">console</span>.log(a + <span class="hljs-number">5</span>);</pre>';

    assert(given, expected);
  });
});

function noop() {}
