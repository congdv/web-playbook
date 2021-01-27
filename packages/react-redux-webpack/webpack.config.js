const path = require('path')

module.exports = {
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, './app/index.js')],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  '@babel/plugin-proposal-decorators',
                  { legacy: true },
                ],
                [
                  '@babel/plugin-proposal-class-properties',
                  { loose: true },
                ],
                '@babel/plugin-proposal-object-rest-spread',
              ],
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          }
        ] 
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader',
        ],
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'app'),
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.otf/i,
        include: path.resolve(__dirname, 'app') + '/font',
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash]',
          },
        }],
      },

    ]
  }
}