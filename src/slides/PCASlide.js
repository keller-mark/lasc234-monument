import React, { useEffect, useRef, useState } from 'react';
import { scaleLinear as d3_scaleLinear } from 'd3-scale';
import { mouse as d3_mouse } from 'd3';
import { mean as d3_mean } from 'd3-array';
import { eig as numeric_eig } from 'numeric';
import { identity as math_identity, subtract as math_subtract, multiply as math_multiply, transpose as math_transpose } from 'mathjs';

import { setupCanvas, teardownCanvas } from './helpers.js';

function argsort(a) {
    return a.map((d, i) => [d, i]).sort(([a], [b]) => (b - a)).map(([d, i]) => i);
}

function pca(X) {
    const K = 2; // number of components
    
    // X is a Nx2 matrix of data (N points in 2 dimensions)
    const N = X.length;
    const D = 2;

    const mu = [ d3_mean(X.map(d => d[0])), d3_mean(X.map(d => d[1])) ];
    const eye = math_identity(N, D)._data;
    
    eye[0][0] = mu[0];
    eye[1][1] = mu[1];

    const C = math_multiply(math_transpose(math_subtract(X, eye)), math_subtract(X, eye));
    const { E: { x: v }, lambda: { x: w } } = numeric_eig(C);
    
    const wIndicesSorted = argsort(w);
    const vSorted = wIndicesSorted.map(i => v[i]);

    const Z = vSorted;

    // Project points onto the two component directions    
    const p0 = math_multiply(math_multiply(X, Z.map(d => [d[0]])), math_transpose(Z.map(d => [d[0]])));
    const p1 = math_multiply(math_multiply(X, Z.map(d => [d[1]])), math_transpose(Z.map(d => [d[1]])));
    
    return { p0, p1 };

}

function draw(context, colors, width, height, x, y, points) {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    context.strokeStyle = colors.textPrimary;
    context.fillStyle = colors.textPrimary;
    
    const axisWidth = 3;

    // Draw y axis
    context.rect(width / 2 - axisWidth / 2, 0, axisWidth, height);
    context.fill();

    // Draw x axis
    context.rect(0, height / 2 - axisWidth / 2, width, axisWidth);
    context.fill();

    // Draw points
    const pointSize = 6;
    for(const [px, py] of points) {
        context.beginPath();
        context.arc(x(px), y(py), pointSize, 0, 2*Math.PI);
        context.stroke();
        context.fill();
    }

    // Do PCA
    const { p0, p1} = pca(points);

    // Draw projected points
    const projectedPointSize = 5;
    context.fillStyle = 'blue';
    context.strokeStyle = 'black';
    for(const [px, py] of p0) {
        context.beginPath();
        context.arc(x(px), y(py), projectedPointSize, 0, 2*Math.PI);
        context.stroke();
        context.fill();
    }

    context.fillStyle = 'red';
    context.strokeStyle = 'black';
    for(const [px, py] of p1) {
        context.beginPath();
        context.arc(x(px), y(py), projectedPointSize, 0, 2*Math.PI);
        context.stroke();
        context.fill();
    }

}

export default function PCASlide(props) {
    const { colors } = props;

    const canvasRef = useRef();
    const [points, setPoints] = useState([[-1, -1], [1, 1]]);

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
        
        
        draw(context, colors, width, height, x, y, points);
        
        canvasSelection.on("click", () => {
            const mouse = d3_mouse(canvas);
            const mouseX = mouse[0];
            const mouseY = mouse[1];

            setPoints([ ...points, [x.invert(mouseX), y.invert(mouseY)] ]);
            draw(context, colors, width, height, x, y, points);
        })
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