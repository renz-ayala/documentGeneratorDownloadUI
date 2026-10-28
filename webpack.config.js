const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const webpackConfig = withModuleFederationPlugin({
  name: 'ui-download',
  filename: 'remoteEntry.js',
  exposes: {
    './DocumentEditor': './src/app/features/pages/document-management/document-management.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

webpackConfig.watchOptions = {
  ignored: /node_modules|\.angular|dist/,
};

module.exports = webpackConfig;
