export default {
  id: 'bi',
  title: 'Markdown Demo',
  schema: {
    "_id": "650eaa59-14ab-4aba-b6b8-52c1189fd5c9",
    "is": "Page",
    "state": {
      "count": 0
    },
    "children": [
      {
        "is": "markdown-it",
        "src": "",
        "theme": "github",
        "body-style": "padding: 32px;",
        ".options": {
          "html": true,
          "linkify": true
        },
        "_id": "7fd0f09e-7cae-4aa7-9657-96faee8e320e",
        "content": "# markdown-it\r\n\r\n[![CI](https://github.com/markdown-it/markdown-it/actions/workflows/ci.yml/badge.svg)](https://github.com/markdown-it/markdown-it/actions/workflows/ci.yml)\r\n[![NPM version](https://img.shields.io/npm/v/markdown-it.svg?style=flat)](https://www.npmjs.org/package/markdown-it)\r\n[![Coverage Status](https://coveralls.io/repos/markdown-it/markdown-it/badge.svg?branch=master&service=github)](https://coveralls.io/github/markdown-it/markdown-it?branch=master)\r\n\r\n---\r\n**Advertisement**\r\n\r\n- **[pica](https://nodeca.github.io/pica/demo/)** - high quality and fast image\r\n  resize in browser.\r\n- **[babelfish](https://github.com/nodeca/babelfish/)** - developer friendly\r\n  i18n with plurals support and easy syntax.\r\n\r\nYou will like those projects!\r\n\r\n---\r\n\r\n# h1 Heading\r\n## h2 Heading\r\n### h3 Heading\r\n#### h4 Heading\r\n##### h5 Heading\r\n###### h6 Heading\r\n\r\n## Emphasis\r\n\r\n**This is bold text**\r\n\r\n__This is bold text__\r\n\r\n*This is italic text*\r\n\r\n_This is italic text_\r\n\r\n~~Strikethrough~~\r\n\r\n\r\n## Blockquotes\r\n\r\n\r\n> Blockquotes can also be nested...\r\n>> ...by using additional greater-than signs right next to each other...\r\n>>> ...or with spaces between arrows.\r\n\r\n## Lists\r\n\r\nUnordered\r\n\r\n+ Create a list by starting a line with `+`, `-`, or `*`\r\n+ Sub-lists are made by indenting 2 spaces:\r\n  - Marker character change forces new list start:\r\n    * Ac tristique libero volutpat at\r\n    + Facilisis in pretium nisl aliquet\r\n    - Nulla volutpat aliquam velit\r\n+ Very easy!\r\n\r\nOrdered\r\n\r\n1. Lorem ipsum dolor sit amet\r\n2. Consectetur adipiscing elit\r\n3. Integer molestie lorem at massa\r\n\r\n\r\n1. You can use sequential numbers...\r\n1. ...or keep all the numbers as `1.`\r\n\r\nStart numbering with offset:\r\n\r\n57. foo\r\n1. bar\r\n\r\n\r\n## Code\r\n\r\nSyntax highlighting\r\n\r\n``` js\r\nvar foo = function (bar) {\r\n  return bar++;\r\n};\r\n\r\nconsole.log(foo(5));\r\n```\r\n\r\n## Tables\r\n\r\n| Option | Description |\r\n| ------ | ----------- |\r\n| data   | path to data files to supply the data that will be passed into templates. |\r\n| engine | engine to be used for processing templates. Handlebars is the default. |\r\n| ext    | extension to be used for dest files. |\r\n\r\nRight aligned columns\r\n\r\n| Option | Description |\r\n| ------:| -----------:|\r\n| data   | path to data files to supply the data that will be passed into templates. |\r\n| engine | engine to be used for processing templates. Handlebars is the default. |\r\n| ext    | extension to be used for dest files. |\r\n\r\n\r\n## Links\r\n\r\n[link text](http://dev.nodeca.com)\r\n\r\n[link with title](http://nodeca.github.io/pica/demo/ \"title text!\")\r\n\r\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\r\n\r\n\r\n## Images\r\n\r\n![Minion](https://octodex.github.com/images/minion.png)\r\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \"The Stormtroopocat\")\r\n\r\nLike links, Images also have a footnote style syntax\r\n"
      }
    ],
    "plugins": [
      "/plugins/web"
    ],
    "designer": {
      "canvas": {
        "style": {
          "width": "375px",
          "height": "667px"
        }
      }
    }
  }
}
