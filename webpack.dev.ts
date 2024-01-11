import WebpackShellPluginNext from 'webpack-shell-plugin-next'
import { merge } from 'webpack-merge'
import common from './webpack.common'
import { Configuration } from 'webpack'

const config = merge<Configuration>(common, {
  mode: 'development',
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        parallel: true,
        scripts: [ 'nodemon dist/index.js' ]
      }
    })
  ],
  watch: true
})

export default config