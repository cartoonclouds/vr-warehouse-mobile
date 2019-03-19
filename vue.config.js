// Vue global configuration file
// https://cli.vuejs.org/config/#vue-config-js

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  css: {
    sourceMap: true
  },
  /*pluginOptions: {
  foo: {
    // plugins can access these options as
    // `options.pluginOptions.foo`.
    }
  }*/
}