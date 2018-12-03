import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const getChild = children => {
  if (!children || !Array.isArray(children)) return children;
  children = children.filter(value => /\S/.test(value));
  return children.length > 0 ? children[0] : '';
}

export default class MathRenderer extends Component {
  static propTypes = { value: PropTypes.string }
  render = () => (this.props.value || getChild(this.props.children)).split("$$").map(
    (e, i) => (i === 0 || i % 2 === 0)
      ? e.split("$").map((ele, i) => (i === 0 || i % 2 === 0) ? ele : <InlineMath math={ele} />)
      : <BlockMath math={e} />
  );
}
