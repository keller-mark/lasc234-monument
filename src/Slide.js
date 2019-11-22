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
    const colorPrimary = _sample(colors);
    const colorsRemaining = new Set(colors);
    colorsRemaining.delete(colorPrimary);
    const colorSecondary = _sample(Array.from(colorsRemaining));
    return [colorPrimary, getTextColor(colorPrimary), colorSecondary, getTextColor(colorSecondary)];
}

export default function Slide(props) {
    const { d, onPrevSlide, onNextSlide } = props;

    const [
        bgColorPrimary, 
        textColorPrimary, 
        bgColorSecondary, 
        textColorSecondary
    ] = getRandomColors(d.colors);

    return (
        <div className="slide h-screen">
            <div className="main" style={{backgroundColor: bgColorPrimary}}>

            </div>
            <div className="footer w-full" style={{backgroundColor: bgColorSecondary, color: textColorSecondary}}>
                <div className="my-0 mx-4 inline-block">
                    <button onClick={onPrevSlide}>&lt;</button>
                    <a className="name inline-block m-4 lg:text-4xl md:text-3xl text-2xl" href={d.links.wikipedia} target="_blank">{ d.name }</a>
                    <button onClick={onNextSlide}>&gt;</button>
                </div>
                <div className="my-2 mx-4 inline-block float-right">
                    { `Born ${(d.birthYear ? d.birthYear : '')} in ${d.birthPlace.name}` } 
                </div>
            </div>
        </div>
    );
}