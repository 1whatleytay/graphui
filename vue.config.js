module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ removeDimensions: true }, { removeViewBox: false }]
        }
      })

    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
