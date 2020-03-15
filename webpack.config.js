const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'scripts/dist');
const APP_DIR = path.resolve(__dirname, 'scripts/src');

const JS_FILENAME = "canvas-video.js";

module.exports = {
    context: APP_DIR,
    entry: {
        'main': `${APP_DIR}/${JS_FILENAME}`
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].js',
        sourceMapFilename: "[name].js.map"
    },

    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                exclude: /node_modules/,
                use: {
                    loader : 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            }
        ]

    }

};
