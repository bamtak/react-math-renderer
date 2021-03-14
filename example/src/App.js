import React, { Component } from 'react'
import 'katex/dist/katex.min.css';
import MathRenderer from 'math-renderer'

export default class App extends Component {
  render() {
    return (
      <div style={{ width: '40%', margin: '0 auto' }} >
        <h1> 'React-math-renderer usage examples' </h1>
        <h3>
          <code>{'<MathRenderer>'}</code>
          <code>{'This string contains an inline expression $\\int_0^\\infty x^2 dx$'} </code>
          <code>{'</ MathRenderer>'}</code>
        </h3>
        <MathRenderer>
          {'This string contains an inline expression $\\int_0^\\infty x^2 dx$'}
        </MathRenderer>
        <p>
          <MathRenderer>
            {'This string is random $\\int_0^\\infty \\$30 x^2 dx $'}
          </MathRenderer>
        </p>
        <p>
          <MathRenderer>
            {'This is a backlash $ \\ $'}
          </MathRenderer>
        </p>
        <h3>
          <code>{'<MathRenderer value={This string contains a block expression $$\\int_0^\\infty x^2 dx$$} />'}</code>
        </h3>
        <MathRenderer value={'This string contains a block expression $$\\int_0^\\infty x^2 dx$$'} />
        <h3>
          <code>{'<MathRenderer>'}</code>
          <code>{`This is another block Expression $$A =
        \\begin{pmatrix}
        1 & 0 & 0 \\\\
        0 & 1 & 0 \\\\
        0 & 0 & 1 \\\\
        \\end{pmatrix}$$`} </code>
          <code>{'</ MathRenderer>'}</code>
        </h3>
        <MathRenderer>{`This is another block Expression $$A =
        \\begin{pmatrix}
        1 & 0 & 0 \\\\
        0 & 1 & 0 \\\\
        0 & 0 & 1 \\\\
        \\end{pmatrix}$$`}
        </MathRenderer>
      </div>
    )
  }
}
