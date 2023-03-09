import path from 'path'
import nodeExternals from 'webpack-node-externals'
import WebpackShellPluginNext from 'webpack-shell-plugin-next'

const { NODE_ENV = 'production' } = process.env

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
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
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [ 'npm run run:dev' ],
        blocking: false,
        parallel: true
      }
    })
  ],
  watch: NODE_ENV === 'development',
  resolve: { extensions: [ '.ts', '.js' ] },
  externals: [ nodeExternals() ]
}