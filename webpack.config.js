var path = require('path');
var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets:['@babel/preset-react']
                }
            },
            {
                test:/\.css$/i,
                use:['style-loader','css-loader']
            },
            {
                test: /\.png|\.jpg/, 
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]'
                    }
                ], 
            },
            {
              test: /\.html$/,
              use: [
                {
                  loader: "html-loader"
                }
              ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./public/index.html",
          filename: "./index.html"
        })
      ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};