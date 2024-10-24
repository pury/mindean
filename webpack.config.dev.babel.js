const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.jsx', 
    // main: ['./src/index.jsx'],

    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'), 
        clean: true,  
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'src'),
                use: ['babel-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],

    devServer: {
        static: {  
            directory: path.join(__dirname, 'dist'),
        },  
        compress: true,
        port: 8888, 
        hot: true, 
        open: true, 
    },
};