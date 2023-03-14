import path from 'path'
import webpackNodeExternals from 'webpack-node-externals'

const config = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: { extensions: [ '.ts', '.js' ] },
  externals: [ webpackNodeExternals() ]
}

export default config
