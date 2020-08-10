function HtmlWebpackSimpleIncludePlugin(options) {
    options = Array.isArray(options) ? options : [options]
    options.forEach(option => {
      if (typeof option.tag == 'undefined' || typeof option.content == 'undefined') {
        throw new Error('Both `tag` and `content` options must be defined!')
      }
    })
  
    this.replace = function(inData, callback) {
      options.forEach(option => {
        inData.html = inData.html.replace(new RegExp(option.tag, "g"), option.content)
      })
  
      callback(null, inData)
    }
  }
  
  HtmlWebpackSimpleIncludePlugin.prototype.apply = function(compiler) {
    if (compiler.hooks) {
        compiler.hooks.compilation.tap('HtmlWebpackSimpleIncludePlugin', compilation => {
        if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
          compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('HtmlWebpackSimpleIncludePlugin', this.replace)
        } else {
          var HtmlWebpackPlugin = require('html-webpack-plugin')
  
          if (!HtmlWebpackPlugin) {
            throw new Error('Make sure `html-webpack-plugin` is placed before `html-webpack-simple-include-plugin` in your Webpack config if you were working with Webpack 4.x.x!')
          }
          HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('HtmlWebpackSimpleIncludePlugin', this.replace)
        }
      })
    } else {
      compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-simple-include-plugin-beforeEmit', this.replace)
      })
    }
  }
  
  module.exports = HtmlWebpackSimpleIncludePlugin
  