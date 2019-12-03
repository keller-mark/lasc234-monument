import React, { useEffect, useRef } from 'react';
import { scaleLinear as d3_scaleLinear } from 'd3-scale';
import { interpolateBasis as d3_interpolateBasis } from 'd3-interpolate';
import { line as d3_line } from 'd3-shape';
import { mouse as d3_mouse, quantize as d3_quantize } from 'd3';
import { setupCanvas, teardownCanvas } from './helpers.js';

function draw(context, colors, width, height, x, y, px) {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.strokeStyle = 'black';

    const linearInterpolator = d3_interpolateBasis([-0.05, 0.5, 1.05]);
    const convexInterpolator = d3_interpolateBasis([0, 0.1, 0.3, 1.1]);
    
    const n = 300;
    const line = d3_line()
        .context(context)
        .x((_, i) => x(i / n))
        .y(y);

    context.beginPath();
    line(d3_quantize(linearInterpolator, 1 + n));
    context.stroke();

    context.beginPath();
    line(d3_quantize(convexInterpolator, 1 + n));
    context.stroke();

    if(px !== null) {
        const pointSize = 10;
        context.beginPath();
        context.arc(x(px), y(convexInterpolator(px)), pointSize, 0, 2*Math.PI);
        context.stroke();
        context.fill();
    }

}

export default function ConvexSlide(props) {

    const { colors } = props;

    const canvasRef = useRef();

    function setup() {
        const { canvas, canvasSelection, context, width, height } = setupCanvas(canvasRef);

        const x = d3_scaleLinear()
            .domain([-0.1, 1.1])
            .range([0, width]);
        
        const y = d3_scaleLinear()
            .domain([-0.1, 1.1])
            .range([height, 0]);

        draw(context, colors, width, height, x, y, null);
        
        canvasSelection.on("mousemove", () => {
            const mouse = d3_mouse(canvas);
            const mouseX = mouse[0];
            
            draw(context, colors, width, height, x, y, x.invert(mouseX));
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