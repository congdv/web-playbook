const webpack = require('webpack');
const path = require('path');

const outputDirectory = 'dist';

const web = {
  entry: {
    main: path.resolve(__dirname, './app/main.js'),
  },
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        
      },
        
      // Styles
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader','postcss-loader','sass-loader'],
      },
       // Images
       {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
       // Fonts and SVGs
       {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ]

  },
  devServer: {
    before: require('./server/index'),
    compress: true,
    hot: false
  }
}

module.exports = (env, argv) => {
  return web;
};