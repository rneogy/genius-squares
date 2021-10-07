const HTMLPlugin = require('html-webpack-plugin')
const FastRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = (env = {}) => {
  const dev = !env.production
  const mode = dev ? 'development' : 'production'
  return {
    entry: `${__dirname}/src`,
    output: {
      clean: true,
      filename: dev ? '[name].js' : '[name].[contenthash].js',
      publicPath: '/',
    },
    plugins: [new HTMLPlugin({title: 'The Genius Square'}), new FastRefreshPlugin()],
    devtool: dev ? 'cheap-module-source-map' : 'source-map',
    mode,
    cache: {
      type: 'filesystem',
      buildDependencies: {config: [__filename]},
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: 'babel-loader',
            options: {envName: mode},
          },
        },
      ],
    },
    performance: {hints: false},
    stats: dev ? 'minimal' : undefined,
    devServer: {
      historyApiFallback: true,
      hot: true,
      open: true,
    },
  }
}
