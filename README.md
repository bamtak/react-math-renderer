# math-renderer

> React component to render latex strings, based on Katex

[![NPM](https://img.shields.io/npm/v/math-renderer.svg)](https://www.npmjs.com/package/math-renderer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save math-renderer
```

## Usage

```jsx
import React, { Component } from 'react'
import MathRenderer from 'math-renderer'
import 'katex/dist/katex.min.css'

class Example extends Component {
  render () {
    return (
      <MathRenderer value={"Inline expression $\\int_0^\\infty x^2 dx$"} />
    )
  }
}

Or

class Example2 extends Component {
  render () {
    return (
      <MathRenderer value={"Block expression $$\\int_0^\\infty x^2 dx$$"} />
    )
  }
}
```

## License

MIT © [bamtak](https://github.com/bamtak)
