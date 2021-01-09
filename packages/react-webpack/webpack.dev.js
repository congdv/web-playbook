const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
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
        // options: {
        //   presets: ['@babel/preset-react'],
        // }, ---> move this part into .babelrc
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
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, outputDirectory),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Webpack',// Title in template file
      template: path.resolve(__dirname, './public/index.html'),// template file path
      //output: 'index.js'// we can set the specific output here
    }),
    new CleanWebpackPlugin()
  ]
}