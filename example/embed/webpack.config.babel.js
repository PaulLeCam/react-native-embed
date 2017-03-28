import path from 'path'
import webpack from 'webpack'

export default {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  target: 'electron',
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-electron',
    },
  },
  output: {
    path: path.resolve(__dirname, 'electron'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'electron'),
    port: 3000,
    stats: {
      cached: false,
    },
  },
}
