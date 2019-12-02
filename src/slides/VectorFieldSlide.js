import React, { useState, useEffect, useRef } from 'react';
import { scaleLinear as d3_scaleLinear } from 'd3-scale';

import { setupCanvas } from './helpers.js';

export default function VectorFieldSlide(props) {

    const { colors } = props;

    const canvasRef = useRef();

    function setup() {
        const { canvas, context, width, height } = setupCanvas(canvasRef);
        
        // Draw y axis
        context.strokeStyle = colors.textPrimary;
        context.fillStyle = colors.textPrimary;
        const axisWidth = 2;
        context.rect(width / 2 - axisWidth / 2, 0, axisWidth, height);
        context.fill();

        // Draw x axis
        context.rect(0, height / 2 - axisWidth / 2, width, axisWidth);
        context.fill();
        
        const interval = 30;
        const xn = Math.ceil(width/2 / interval);
        const yn = Math.ceil(height/2 / interval);
        const x = d3_scaleLinear()
            .domain([-xn, xn])
            .range([0, width]);
        
        const y = d3_scaleLinear()
            .domain([-yn, yn])
            .range([height, 0]);
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

                const px = -5;
                const py = -5;

                const dx = Math.sqrt(
                    Math.pow(vectorLength, 2) + 
                    Math.pow(vectorLength, 2) - 
                    2*vectorLength*vectorLength*Math.cos(Math.atan(Math.abs(xi - px) / Math.abs(yi - py))));

                context.beginPath();
                context.moveTo(x(xi), y(yi));
                context.lineTo(x(xi-(xi < px ? -1 : 1)*dx), y(yi-(yi < py ? -1 : 1)*vectorLength));
                context.stroke();
            }
        }
    }

    function teardown() {

    }

    useEffect(() => {

        setup();
        
        return () => {
            teardown();
        };
    });

    return (<canvas className="w-full h-full" ref={canvasRef}></canvas>);
}