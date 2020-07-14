const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const modoDev = process.env.NODE_ENV !== 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptmizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: modeDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer:{
        contentBase: './public',
        port:9000
    },
    optmization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptmizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'estyle.css'
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                //'style-loader',  // adiciona CSS a DOM injetando a tag <style>
                'css-loader,',//interpreta @import, url()...
                'sass-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']

        }]
    }
}