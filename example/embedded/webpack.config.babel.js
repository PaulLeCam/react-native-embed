import path from 'path'
import webpack from 'webpack'

export default {
  entry: {
    app: path.join(__dirname, 'src/index.js'),
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
      'react-native': 'react-native-web',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
      },
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 7000,
    stats: {
      cached: false,
    },
  },
}
