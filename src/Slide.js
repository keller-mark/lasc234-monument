import React from 'react';
import './Slide.css';

export default function Slide(props) {
    const { d } = props;
    return (
        <div className="slide">
            <p>{d.name}</p>
        </div>
    );
}