'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { LEGACY } = process.env;

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // custom options here
  });

  if (LEGACY) {
    return app.toTree();
  }

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    staticHelpers: true,
    staticComponents: true,
    // splitAtRoutes: ['docs', 'docs.templates'],
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
              ],
            },
          ],
        },
      },
    },
  });
};
