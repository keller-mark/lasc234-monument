import React from 'react';
import { sample as _sample } from 'lodash';
import './Slide.scss';

function getRandomColors(colors) {
    const colorPrimary = _sample(colors);
    const colorsRemaining = new Set(colors);
    colorsRemaining.delete(colorPrimary);
    const colorSecondary = _sample(Array.from(colorsRemaining));
    console.log(colorSecondary);
    return [`#${colorPrimary}`, `#${colorSecondary}`];
}

export default function Slide(props) {
    const { d, hidden } = props;

    const [colorPrimary, colorSecondary] = getRandomColors(d.colors);

    return (hidden ? null :
        <div className="slide flex-initial h-screen">
            <div className="main" style={{backgroundColor: colorPrimary}}>

            </div>
            <div className="footer" style={{backgroundColor: colorSecondary}}>
                <a className="name inline-block m-4 text-3xl" href={d.links.wikipedia} target="_blank">{ d.name }</a>
            </div>
        </div>
    );
}