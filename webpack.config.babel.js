import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
    entry: './src/index.js',

    output: {
        filename: 'mindean.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [{
            test: /\.js$/, 
            include: path.join(__dirname, 'src'),
            use: {
                loader: 'babel-loader',
            },
        }, ],
    },

    resolve: {
        extensions: ['.js'],
    },

    plugins: [
        new CleanWebpackPlugin(),
    ],
};