const manifestJSON = require('./public/manifest.json')
const pwaArgs = {
  themeColor: manifestJSON.theme_color,
  name: manifestJSON.short_name,
  msTileColor: manifestJSON.background_color,
  startUrl: `${process.env.BASE_URL}${manifestJSON.start_url}`
}

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.BASE_URL,
  chainWebpack: config => {
    config.plugin('pwa').tap(args => {
      return [pwaArgs]
    })
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true,
      emitWarning: true,
      emitError: true
    })
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "${process.env.VUE_APP_SCSS_VARS}";`
      }
    }
  }
}
