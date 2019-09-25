import React from "react";
import PropTypes from 'prop-types';
import 'katex/dist/katex.min.css';
import katex from "katex";

const dollarEscape = '&&dOllAR';
const processTable = string => string.includes('table') ? processMatrix(string) : string;

const MATRIX_REG_1 = /(\|)table(.*?)(\|)/g; // Matrix 
const MATRIX_REG_2 = /(\{)table(.*?)(\})/g; // Matrix 
const MATRIX_REG_3 = /(\[)table(.*?)(\])/g; // Matrix 
const MATRIX_REG_4 = /(\()table(.*?)(\))/g; // Matrix 
const processMatrix = string => {
    string = string.replace(/\\(?!frac)(-*\w+)/g, '$1');
    [MATRIX_REG_1, MATRIX_REG_2, MATRIX_REG_3, MATRIX_REG_4].forEach((MATRIX_REG, i) => {
        const matches = string.match(MATRIX_REG);
        const escapeChar = i === 1 ? '\\' : '';
        if (matches === null) return;
        matches.forEach(match => {
            let str = match;
            str = str.replace(MATRIX_REG, '\\left' + escapeChar + '$1\\begin{matrix}$2\\end{matrix}\\right' + escapeChar + '$3');
            str = str.replace(/,/g, '&');
            str = str.replace(/;/g, '\\\\');
            string = string.replace(match, str);
        })
    })
    return string;
}

const FRACTION_REG = /(\w+|\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\})\/(\w+|\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\})/g; // 5/6
const POWER_REG = /(\w+|\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\})\^(-*\d+|-*\w)/g; // process t^7788
const SQRT_REG = /√\s*(\^(\w+|\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}))*(-*\w+|(\w+|\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}))/g;

const processMisc = string => {
    string = string.replace(/&&dOllAR/g, '\\$');
    string = string.replace(FRACTION_REG, '\\frac{$1}{$2}');
    string = string.replace(POWER_REG, '$1^{$2}');
    string = string.replace(SQRT_REG, '\\sqrt[$2]$3');
    string = processTable(string);
    return string;
}

const latexString = (string, options) => {
    string = string.replace(/\\\$/g, dollarEscape);
    string = string.replace(/(<([^>]+)>)/gi, "");
    const regularExpression = /\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g;

    const stripDollars = (stringToStrip) => {
        if (stringToStrip[1] === "$") stringToStrip = stringToStrip.slice(2, -2);
        else stringToStrip = stringToStrip.slice(1, -1);
        return stringToStrip;
    };

    const renderLatexString = (s) => {
        let renderedString = processMisc(s);
        try {
            renderedString = katex.renderToString(renderedString, options);
        } catch (err) {
            if (s.includes('\\')) {
                return renderLatexString(s.replace(/\\(.*?)/g, '$1'))
            }
            console.error("couldn`t convert string", s);
            return s;
        }
        return renderedString;
    };

    const result = [];

    const latexMatch = string.match(regularExpression);
    const stringWithoutLatex = string.split(regularExpression);

    if (latexMatch) {
        stringWithoutLatex.forEach((s, index) => {
            result.push({
                string: s,
                type: "text",
            });
            if (latexMatch[index]) {
                result.push({
                    string: stripDollars(latexMatch[index]),
                    type: "latex",
                });
            }
        });
    } else {
        result.push({
            string,
            type: "text",
        });
    }

    const processResult = (resultToProcess) => {
        const newResult = resultToProcess.map((r) => {
            if (r.type === "text") {
                return r.string;
            }
            return renderLatexString(r.string);
        });

        return newResult.join(" ");
    };

    return processResult(result);
};

function getChild(children) {
    if (!children || !Array.isArray(children)) return children;
    children = children.filter(value => /\S/.test(value))
    return children.length > 0 ? children[0] : '';
}

export default class MathRenderer extends React.Component {
    static propTypes = {
        children: PropTypes.string,
        displayMode: PropTypes.bool,
    };

    static defaultProps = {
        children: "",
        displayMode: false,
    };

    render() {
        const { displayMode } = this.props;
        const value = this.props.value || getChild(this.props.children);
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: latexString(value, { displayMode }),
                }}
            />
        );
    }
}
