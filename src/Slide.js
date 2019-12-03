import React from 'react';
import { sample as _sample } from 'lodash';
import { contrast } from 'chroma-js';
import './Slide.scss';

function getTextColor(bgColor) {
    const contrastWithBlack = contrast(bgColor, "#000");
    const contrastWithWhite = contrast(bgColor, "#FFF");
    return (contrastWithBlack >= contrastWithWhite ? "#000" : "#FFF");
}

function getRandomColors(colors) {
    // const colorPrimary = _sample(colors);
    const colorPrimary = colors[0];
    const colorsRemaining = new Set(colors);
    colorsRemaining.delete(colorPrimary);
    // const colorSecondary = _sample(Array.from(colorsRemaining));
    const colorSecondary = colors[1];
    return { 
        bgPrimary: colorPrimary, 
        textPrimary: getTextColor(colorPrimary), 
        bgSecondary: colorSecondary, 
        textSecondary: getTextColor(colorSecondary) 
    };
}

export default function Slide(props) {
    const { d, onPrevSlide, onNextSlide } = props;

    const colors = getRandomColors(d.colors);

    const pubLink = d.links.publications[0];

    return (
        <div className="slide h-screen">
            <div className="header" style={{backgroundColor: colors.bgPrimary, color: colors.textPrimary}}>
                {d.keywords ? (d.keywords.map(k => (
                    <a 
                        className="keyword p-2 text-lg" 
                        href={k.wikipedia} 
                        target="_blank" 
                        style={{color: colors.textPrimary, fontWeight: (k.bold ? 'bold' : 'normal')}} 
                        key={k.word}
                    >{k.word}</a>
                ))) : null}
            </div>
            <div className="main" style={{backgroundColor: colors.bgPrimary}}>
                {d.slide ? React.createElement(d.slide, { colors }) : null}
            </div>
            <div className="footer w-full" style={{backgroundColor: colors.bgSecondary, color: colors.textSecondary}}>
                <div className="my-0 mx-4 inline-block">
                    <button onClick={onPrevSlide}>&lt;</button>
                    <a className="name inline-block m-4 lg:text-4xl md:text-3xl text-2xl" href={d.links.wikipedia} target="_blank">{ d.name }</a>
                    <button onClick={onNextSlide}>&gt;</button>
                    <br/>
                    <a 
                        href={(pubLink.startsWith('http') ? pubLink : `http://doi.org/${pubLink}`)} 
                        target="_blank"
                    >Publications</a>
                </div>
                <div className="my-2 mx-4 inline-block float-right">
                    { `Born ${(d.birthYear ? d.birthYear : '')} in ${d.birthPlace.name}` }
                    <br/><br/><br/>
                    <a 
                        href="https://github.com/keller-mark/lasc234-monument" 
                        target="_blank" 
                        className="block" 
                        style={{textAlign: 'right'}}
                    >Code</a>
                    
                </div>
            </div>
        </div>
    );
}