const webpack = require('webpack')
const path = require('path')
const finder = require('find-package-json')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

function configure(env) {
  const BUCKET = `https://${(env && env.bucket) || 'uptick-bsecure'}.s3.amazonaws.com/`
  const OUTPUT = path.resolve((env && env.output) || './lib')
  const INDEX = path.resolve((env && env.index) || './src/index')

  let config = {
    target: 'web',
    entry: [
      'babel-polyfill',
      INDEX
    ],
    output: {
      path: OUTPUT,
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: filepath => isEsNext(filepath),
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(ttf|eot|woff|woff2)(\?=\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        }
      ]
    },
    resolve: {
      mainFields: ['esnext', 'browser', 'module', 'main'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules')
      ],
      extensions: [
        '.js'
      ]
    },
    plugins: [
      new PeerDepsExternalsPlugin(),
      new webpack.DefinePlugin({
        BUCKET: '"' + BUCKET + '"'
      })
    ]
  }

  if (env && env.production) {
    config.output.filename = 'bundle-[hash].min.js'
    config.output.publicPath = `https://${env.bucket || 'uptick-bsecure'}.s3.amazonaws.com/static/`
    config.plugins = config.plugins.concat([
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(
        [config.output.path]  // TODO: This is borked.
      ),
      new CompressionPlugin({
        asset: '[path]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        minRatio: Number.MAX_SAFE_INTEGER
      })
    ])
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              pure_funcs: [
                'console.debug'
              ]
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  }
  else if (env && env.hmr) {
    config.output = {
      publicPath: '/static/',
      filename: 'bundle.js'
    }
    config.entry = [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ].concat(config.entry)
    config.plugins = config.plugins.concat([
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
    config.devServer = {
      host: env.host || 'localhost',
      port: 3000,
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true  // needed for end-to-end tests
    }
    config.watch = true
    config.watchOptions = {...(config.watchOptions || {}), poll: true}
  }

  return config
}

/**
 * Identify a file's package as being "esnext" compatible. This indicates
 * whether we can directly import the package's source into our project
 * instead of its transpiled code.
 */
function isEsNext(filepath) {
  const pkgJson = finder(filepath).next().value
  const v = {}.hasOwnProperty.call(pkgJson, 'esnext')
  return v
}

module.exports = configure
