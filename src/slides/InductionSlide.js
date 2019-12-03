import React, { useState } from 'react';
import MathJax from 'react-mathjax';
import { range } from 'lodash';

const tex0 = `\\text{Let } P(n) \\text{ be the statement } 1+2+3+ \\dots +n = \\frac{n (n+1)}{2} \\\\ \\text{Show that } P(n) \\text{ is true for all natural numbers } n \\geq 1. \\\\`;

const tex1 = `\\text{Base Case: } P(1), 1 = \\frac{1 (1+1)}{2} \\\\`;

const tex2 = `\\text{Inductive Case: Let } k \\geq 1.\\text{ Assume that } P(k) \\text{ is true.} \\\\
\\text{Then we must prove that } P(k+1) \\text{ is true as well.} \\\\`;

const tex3 = `P(k+1)\\text{ means } 1+2+3+\\dots+k+(k+1) = \\frac{(k+1)(k+2)}{2}. \\\\`;

const tex4 = `\\text{To prove this, add } (k+1) \\text{ to each side of } P(k): \\\\ 1+2+3+\\dots+k+(k+1) = \\frac{k(k+1)}{2} + (k+1) \\\\`;

const tex5 = `\\text{Simplify the right side: } \\\\ \\frac{k(k+1)}{2} + \\frac{2(k+1)}{2}\\\\`;

const tex6 = `= \\frac{k(k+1) + 2(k+1)}{2} \\\\`;

const tex7 = ` = \\frac{(k+2)(k+1)}{2} \\\\
\\text{Because } P(k+1) \\text{ is true, by the principle of induction, } P(n) \\text{ is true for all natural numbers } n \\geq 1.\\\\`;

const steps = [tex0, tex1, tex2, tex3, tex4, tex5, tex6, tex7];

export default function InductionSlide(props) {

    const { colors } = props;

    const [currStep, setCurrStep] = useState(1);

    function nextStep() {
        setCurrStep(currStep+1);
    }

    function resetStep() {
        setCurrStep(0);
    }

    return (
        <MathJax.Provider>
            <div className="w-full h-full">
                {range(currStep).map(i => (
                    <MathJax.Node formula={steps[i]} key={i} />
                ))}

                <div className="induction-next w-full">
                    {((currStep < steps.length)
                        ? (<button onClick={nextStep}>Next</button>)
                        : (<button onClick={resetStep}>Reset</button>)
                    )}
                </div>
            </div>
        </MathJax.Provider>
    );
}