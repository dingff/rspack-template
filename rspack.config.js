/**
 * @type {import('@rspack/cli').Configuration}
 */
const path = require('path')
const MpaRspackPlugin = require('mpa-rspack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const devPublicPath = '/'
const port = '8888'

console.log('NODE_ENV', process.env.NODE_ENV)

module.exports = {
  entry: {},
  output: {
    filename: isProduction ? '[name].[contenthash:6].js' : '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
  },
  builtins: {
    html: [],
    progress: true,
    css: {
      modules: {
        localIdentName: '[local]--[hash:6]',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    port,
    devMiddleware: {
      publicPath: devPublicPath,
    },
  },
  plugins: [new MpaRspackPlugin({
    html: {
      template: './index.html',
    },
    mountElementId: 'root',
    lowerCase: true,
    layout: './src/layouts/index.tsx',
    open: `http://localhost:${port}${devPublicPath}`,
  })],
  mode: isProduction ? 'production' : 'development',
  context: __dirname,
  devtool: isProduction ? false : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'sass-loader',
          },
        ],
        type: 'css/module',
      },
      {
        test: /^(?!.*\.module).*\.s[ac]ss$/,
        use: [{
          loader: 'sass-loader',
        }],
        type: 'css',
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp|tiff|svg|woff|ttf)$/i,
        type: 'asset',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

