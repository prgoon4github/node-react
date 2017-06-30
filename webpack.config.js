var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry:{       //Here is where our code will be
     app: './src/app.js'
    },
    output:{    //Here is what it will put after compiling
       filename: 'public/build/bundle.js',
       sourceMapFilename: 'public/build/bundle.map'
    },
    devtool: '#source-map',
    module:{
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
    }
}
