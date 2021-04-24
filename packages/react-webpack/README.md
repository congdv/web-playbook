# React Webpack

Webpack is a module bundler that will bundle your code in the latest Javascript or Typescript and compile it to the Javascript that can run cross-browser

## Usage

## How to setup

Install `webpack` and `webpack-cli`

```
yarn add -D webpack webpack-cli
```
- `webpack` - Module and asset bundler
- `webpack-cli` - Command line interface for webpack

### Configuration for Webpack

Create a `webpack.config.js` in the root of the project

Set Entry of the project

```
const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
}
```

Set the Output of the project

```
module.exports = {
  /* ... */

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
}
```

### Build code with Webpack

In `package.json` we can set `build` command

```
"script": {
  "build": "webpack"
}
```

when running build command, the webpack will take a look on `webpack.config.js` to compile the code.

### Plugins

When building single-page applications we usually need one `.html` file to serve it

By using `html-webpack-plugin`, we can generate an HTML file from a template or itself

```
yarn add -D html-webpack-plugin
```

Creating the template html at `public/index.html`

However we need to webpack know our html template.

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
  ***
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Webpack',// Title in template file
      template: path.resolve(__dirname, './public/index.html'),// template file path
      //output: 'index.js'// we can set the specific output here
    })
  ]
}

```

To clean the build files we can use `clean-webpack-plugin`.

```
yarn add -D clean-webpack-plugin
```

```
***
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
 ***
  plugins: [
   ***
    new CleanWebpackPlugin()
  ]
}
```

#### React Library

Now we have a template html, then we need to add React library to our project

```
yarn add react react-dom
```

When we create an simple code with Javascript and React, we may encounter the error related to `loader`. Because Webpack only knows how to deal with plain Javascript, you use JS(ES6) you may get this error when webpack bundle our project.

**Loader** will try to intercept our dependencies and preprocess them before bundling.

When the main program, import any file from node_modules, we need to update the scope of loaders.
```
  include: [path.resolve(__dirname, 'src'), path.resolve('node_modules/react-toastify/dist')]
```


#### Loader

For Javascript code, we can use `babel` to transpile our code. Here are few dependencies for Babel.

- `babel-loader` - Transpile files with Babel and webpack
- `@babel/core` - Transpile ES2015+ to backwards compatible JavaScript
- `@babel/preset-env` - Smart defaults for Babel
- `@babel/plugin-proposal-class-properties` - An example of a custom Babel config (use properties directly on a class)

```
yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-env @babel/plugin-proposal-class-properties
```

All above dependencies are for modern Javascript, if you want to transpile the React Code, you can use

```
yarn add -D @babel/preset-react
```

Here is the easy way to define the rule for loader

```
 module: {
    rules: [
      {
        test: /* RegEx */,
        use: [
          {
            loader: /* loader name */,
            query: /* optional config object */
          }
        ] 
      }
    ]
  }
```

#### Development

You can notice that every time we change the code we need to build our project again, and that is tedious. You we can set up the development for our project by installing `webpack-dev-server` - Development server for webpack

```
yarn add -D webpack-dev-server
```


```
***

const outputDirectory = 'dist';

module.exports = {
  ****
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, outputDirectory),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
   ***
  ]
}
```

Check devServer config [here](https://webpack.js.org/configuration/dev-server/)

Here is how we use webpack-dev-server

```
"script" : {
  ...
  "dev": "webpack serve --mode development --devtool inline-source-map --hot", 
}
```

#### Production

Usually, we will have two versions of webpack, one for development and one for production. So we can split our current config of webpack to two versions. That is `webpack.dev.js` and `webpack.production.js`. The biggest different is devServer configuration in development version.

#### Additional
**Styles**

To allow Webpack process our css style, we need to install css and style loaders.

- `css-loader` - Resolve CSS imports
- `style-loader` - Inject CSS into the DOM

```
yarn add -D css-loader style-loader
```

```
***

module.exports = {
  ****
  module: {
    rules: [
     ***
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]

  },
  devServer: {
    ***
  },
  plugins: [
    ***
  ]
}
```

If you want to use SASS to style your web, here are few dependencies for that
- `sass-loader` - Load SCSS and compile to CSS
- `node-sass` - Node Sass

```
yarn add -D sass-loader node-sass
```

Update the rule for styling
```
```

Also, if you want to use latest css feature in any browser, [PostCSS](https://postcss.org/) will be good choice for you. The `PostCSS` wil transform your css that support in different browser
- `postcss-loader` - Process CSS with PostCSS
- `postcss-preset-env` - Sensible defaults for PostCSS

```
yarn add -D postcss-loader postcss-preset-env
```

Just like with Babel, PostCSS will require a config file, so make that and add it to the root.

In postcss.config.js

```
module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
  },
}
```
We also need to update the rule

```
***

module.exports = {
  ****
  module: {
    rules: [
     ***
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader','postcss-loader','sass-loader'],
      }
    ]

  },
  devServer: {
    ***
  },
  plugins: [
    ***
  ]
}
```

**Images**

Wepack has some built in asset modules, to use it you can define like this

```
module.exports = {
  /* ... */
  module: {
    rules: [
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
}

```

**Fonts and Inline**
module.exports = {
  /* ... */
  module: {
    rules: [
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
}

## Reference:

- https://www.taniarascia.com/how-to-use-webpack/
- https://css-tricks.com/introduction-webpack-entry-output-loaders-plugins/
- https://fullstackopen.com/en/part7/webpack