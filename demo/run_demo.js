'use strict';
var path = require('path');

var webpack = require('webpack');


main();

function main() {
    console.log('Starting building demo');

    // TODO: exec webpack
    webpack({
        entry: path.resolve(__dirname, 'demo_index'),
        output: {
            path: path.resolve(__dirname, 'output'),
            filename: 'bundle.js',
        },
        resolve: {
            extensions: ['.js', '.md'],
        },
        module: {
            loaders: [
                {
                    test: /\.md$/,
                    loader: 'html!../index!markdown-loader',
                }
            ]
        }
    }, function(err) {
        if(err) {
            console.error(err);
        }

        console.log('Finished. See /output');
    });
};
