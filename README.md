[![build status](https://secure.travis-ci.org/bebraw/highlight-loader.png)](http://travis-ci.org/bebraw/highlight-loader)
# highlight-loader - Applies highlight.js to given HTML

This can be handy with [markdown-loader](https://github.com/peerigon/markdown-loader). This loader works well with its HTML output. We just replace the contents of `<code>` blocks with [highlight.js](https://www.npmjs.com/package/highlight.js) compatible output.

## Example

```javascript
var html = require('html!highlight!markdown!./README.md');
```

## License

highlight-loader is available under MIT. See LICENSE for more details.
