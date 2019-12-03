import React, { useRef, useState } from 'react';
import { range } from 'lodash';

const numPeople = Math.floor(Math.random()*20)+1;
const positions = range(numPeople).map(() => [Math.random()*500, Math.random()*800]);

const stickFigureG = (<g transform="scale(0.4)">
    <g transform="translate(-258.38235,-359.68572)">
        <path
            d="M 289.70588,466.47983 L 345.58824,482.95042 L 397.05882,465.59748"
            style={{fill:'none', fillOpacity:0.75, fillRule:'evenodd', stroke:'#FFFFFF', strokeWidth:2,strokeLinecap:'round', strokeLinejoin: 'round', strokeMiterlimit:4, strokeDasharray:'none',strokeOpacity:1}} />
        <path
            d="M 305,576.18571 L 345.88235,515.89159 L 377.64706,575.59748"
            style={{fill:'none', fillOpacity:0.75, fillRule:'evenodd', stroke:'#FFFFFF', strokeWidth:2,strokeLinecap:'round', strokeLinejoin: 'round', strokeMiterlimit:4, strokeDasharray:'none',strokeOpacity:1}} />
        <path
            d="M 345.9104,516.00089 L 345.9104,451.63338"
            style={{fill:'none', fillOpacity:0.75, fillRule:'evenodd', stroke:'#FFFFFF', strokeWidth:2,strokeLinecap:'round', strokeLinejoin: 'round', strokeMiterlimit:4, strokeDasharray:'none',strokeOpacity:1}} />
        <path
            transform="translate(22.352941,-12.411765)"
            d="M 361.49863 429.93896 A 37.282658 34.34148 0 1 1  286.93332,429.93896 A 37.282658 34.34148 0 1 1  361.49863 429.93896 z"
            style={{fill:'none', fillOpacity:1, fillRule:'nonzero', stroke:'#FFFFFF', strokeWidth:2,strokeLinecap:'round', strokeLinejoin: 'round', strokeMiterlimit:100, strokeDasharray:'none',strokeOpacity:1}} />
        <path
            transform="translate(12.880335,-19.248572)"
            d="M 330.1751 429.93896 A 5.9591279 5.9591279 0 1 1  318.25684,429.93896 A 5.9591279 5.9591279 0 1 1  330.1751 429.93896 z"
            style={{fill:'none', fillOpacity:1, fillRule:'nonzero', stroke:'#FFFFFF', strokeWidth:2,strokeLinecap:'round', strokeLinejoin: 'round', strokeMiterlimit:100, strokeDasharray:'none',strokeOpacity:1}} />
        <path
            transform="translate(32.439159,-19.248572)"
            d="M 330.1751 429.93896 A 5.9591279 5.9591279 0 1 1  318.25684,429.93896 A 5.9591279 5.9591279 0 1 1  330.1751 429.93896 z"
            style={{fill:'none', fillOpacity:1, fillRule:'nonzero', stroke:'#FFFFFF', strokeWidth:2,strokeLinecap:'round', strokeLinejoin: 'round', strokeMiterlimit:100, strokeDasharray:'none',strokeOpacity:1}} />
        <path
            transform="matrix(0.9995118,-3.1243063e-2,3.1243063e-2,0.9995118,9.3957979,-16.053504)"
            d="M 344.35227,455.7106 A 31.228014,33.717564 0 0 1 304.35677,455.96005"
            style={{fill:'none', fillOpacity:1, fillRule:'nonzero', stroke:'#FFFFFF', strokeWidth:2,strokeLinecap:'round', strokeLinejoin: 'round', strokeMiterlimit:100, strokeDasharray:'none',strokeOpacity:1}} />
    </g>
</g>);

export default function DemographySlide(props) {

    const { colors } = props;

    const svgRef = useRef();
    const [guess, setGuess] = useState(0);

    function handleInputChange(e) {
        setGuess(parseInt(e.target.value));
    }

    function checkGuess() {
        if(guess > 0) {
            if(guess === numPeople) {
                alert("You are correct!");
            } else {
                alert("Incorrect, please try again.");
            }
        }
    }

    return (
        <div className="w-full h-full">
            <svg className="w-full h-full" ref={svgRef}>
                {range(numPeople).map(i => (
                    <g key={i} transform={`translate(${positions[i][0]}, ${positions[i][1]})`}>
                        {stickFigureG}
                    </g>
                ))}
            </svg>
            <div className="demography-guess">
                <input type="number" onChange={handleInputChange} value={guess} /><br/>
                <span onClick={checkGuess}>Guess</span>
            </div>
        </div>
    );
}