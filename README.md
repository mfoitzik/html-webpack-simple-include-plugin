# [html-webpack-simple-include-plugin]

This is a webpack plugin that provides a way to do simple HTML includes in your html files. The intended purpose is to add common snippets like headers, footers, sidebars, etc. into the html pages. It was originally designed for situations where a multi page website is being generated with webpack.

## PLEASE NOTE: This plugin works in conjunjunction with html-webpack-plugin

## How to use

First of all, you need both `html-webpack-plugin` and `html-replace-webpack-plugin`.

```shell
npm install html-webpack-plugin html-webpack-simple-include-plugin
```

### Include Patterns
This plugin is designed to simply replace a search pattern with replacement text. I use fake html tags as the search pattern just in case something goes wrong. That way if the search text is not replaced the search text does not get displayed in the HTML file. For example '<include-header />'

The plugin is passed an array of objects with `tag` and `content` properties. The HTML files get serached for the tag value and if found, get replaced with the content value.

### Configure your `webpack.config.js` file:

> NOTE THAT `html-replace-webpack-plugin` IS PLACED AFTER `html-webpack-plugin` in Webpack config.

```javascript
const webpack = require('webpack')
const HtmlWebpackSimpleIncludePlugin = require('html-webpack-simple-include');
const fs = require('fs');

module.exports = {
  // Webpack plugins. NOTE that HtmlWebpackSimpleIncludePlugin comes after HtmlWebpackPlugin
  plugin: [
    new HtmlWebpackPlugin({
      /* configurations */
    }),
    // Replace html contents with string or regex patterns
    new HtmlWebpackSimpleIncludePlugin([
      {
        // this example shows replacing with literal text
        tag: '<include-header />',
        content: '<h1>This is my header</h1>'
      },
      {
        // this example shows replacing with file contents
        tag: '<include-footer />',
        content: fs.readFileSync(path.resolve(__dirname, "src/footer.html"))
      }
      }
    ])
  ]
}
```

#### In your source HTML file(s):

```html
<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My Web Page</title>
    </head>
    <body>
      <include-header />
      <p>Main COntent</p>
      <include-footer />
    </body>
</html>
```

Author
------

Mike Foitzik

License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
