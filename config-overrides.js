const LESS_VARIABLES  = require('./src/common/styles/variable-less.js');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addDecoratorsLegacy
} = require('customize-cra');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false; //去掉map文件
    if (config.plugins) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    const splitChunksConfig = config.optimization.splitChunks;
     if (config.entry && config.entry instanceof Array) {
       config.entry = {
         main: config.entry,
         vendor: ["react", "react-dom", "react-router-dom", "react-redux", "redux", 'react-router-config',
           "lodash", "moment", 'react-intl', 'react-addons-pure-render-mixin', 'redux-promise-middleware', "react-router", 
         ]
       }
     } else if (config.entry && typeof config.entry === 'object') {
       config.entry.vendor = ["react", "react-dom", "react-router-dom", "react-redux", "redux", 'react-router-config', 
          "lodash", "moment", 'react-intl', 'react-addons-pure-render-mixin', 'redux-promise-middleware', "react-router", 
       ];
     }
 
    Object.assign(splitChunksConfig, {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
          chunks: 'all'
        }
      }
    })
  }
  return config;
}
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      // "@icon-url": `${path.resolve(__dirname,'build/assets/font/iconfont')}`, //使用本地字体文件
      ...LESS_VARIABLES
    },
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
    // ["mock"]: path.resolve(__dirname, "src/mock"),
    // ["containers"]: path.resolve(__dirname, "src/containers"),
    // ["components"]: path.resolve(__dirname, "src/components")
  }),
  addDecoratorsLegacy(),
  addCustomize()
);