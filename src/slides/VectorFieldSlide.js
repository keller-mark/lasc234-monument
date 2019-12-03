import React, { useEffect, useRef } from 'react';
import { scaleLinear as d3_scaleLinear } from 'd3-scale';
import { mouse as d3_mouse } from 'd3';

import { setupCanvas, teardownCanvas } from './helpers.js';

function draw(context, colors, width, height, xn, yn, x, y, px, py) {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    // Draw y axis
    context.strokeStyle = colors.textPrimary;
    context.fillStyle = colors.textPrimary;
    const axisWidth = 3;
    context.rect(width / 2 - axisWidth / 2, 0, axisWidth, height);
    context.fill();

    // Draw x axis
    context.rect(0, height / 2 - axisWidth / 2, width, axisWidth);
    context.fill();
    
    
    // Draw vertical grid lines
    for(let xi = -xn; xi < xn; xi++) {
        context.beginPath();
        context.moveTo(x(xi), 0);
        context.lineTo(x(xi), height);
        context.stroke();
    }

    // Draw horizontal grid lines
    for(let yi = -yn; yi < yn; yi++) {
        context.beginPath();
        context.moveTo(0, y(yi));
        context.lineTo(width, y(yi));
        context.stroke();
    }

    // Draw vector arrows toward origin
    const vectorLength = 0.5;
    for(let xi = -xn-1; xi < xn; xi++) {
        for(let yi = -yn; yi < yn+1; yi++) {

            const dx = Math.sqrt(
                Math.pow(vectorLength, 2) + 
                Math.pow(vectorLength, 2) - 
                2*vectorLength*vectorLength*Math.cos(Math.atan(Math.abs(xi - px) / Math.abs(yi - py)))
            );

            context.beginPath();
            context.moveTo(x(xi), y(yi));
            context.lineTo(x(xi-(xi === px ? 0 : (xi < px ? -1 : 1))*dx), y(yi-(yi === py ? 0 : (yi < py ? -1 : 1))*vectorLength));
            context.stroke();
        }
    }
}

export default function VectorFieldSlide(props) {

    const { colors } = props;

    const canvasRef = useRef();

    function setup() {
        const { canvas, canvasSelection, context, width, height } = setupCanvas(canvasRef);

        const interval = 30;
        const xn = Math.ceil(width/2 / interval);
        const yn = Math.ceil(height/2 / interval);
        const x = d3_scaleLinear()
            .domain([-xn, xn])
            .range([0, width]);
        
        const y = d3_scaleLinear()
            .domain([-yn, yn])
            .range([height, 0]);
        
        draw(context, colors, width, height, xn, yn, x, y, 0, 0);
        
        canvasSelection.on("mousemove", () => {
            const mouse = d3_mouse(canvas);
            const mouseX = mouse[0];
            const mouseY = mouse[1];
            
            draw(context, colors, width, height, xn, yn, x, y, x.invert(mouseX), y.invert(mouseY));
        });
    }

    function teardown() {
        teardownCanvas(canvasRef);
    }

    useEffect(() => {
        setup();
        return teardown;
    });

    return (<canvas className="w-full h-full" ref={canvasRef}></canvas>);
}