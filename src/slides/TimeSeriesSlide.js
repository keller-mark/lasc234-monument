import React, { useEffect, useRef } from 'react';
import { scaleLinear as d3_scaleLinear } from 'd3-scale';
import { mouse as d3_mouse, extent as d3_extent, min as d3_min, max as d3_max } from 'd3';
import { range } from 'lodash';
import { setupCanvas, teardownCanvas } from './helpers.js';

const startYear = 1960;
const endYear = 2018;
const population = [
    8141841,
    8439261,
    8742777,
    9052635,
    9369096,
    9692278,
    10022592,
    10359745,
    10702291,
    11048262,
    11396393,
    11745945,
    12097694,
    12453718,
    12816955,
    13189509,
    13572208,
    13964379,
    14364727,
    14771271,
    15182611,
    15597886,
    16017573,
    16443134,
    16876703,
    17319520,
    17772001,
    18232730,
    18698847,
    19166471,
    19632665,
    20096317,
    20557683,
    21016901,
    21474549,
    21931084,
    22385650,
    22837743,
    23288564,
    23739841,
    24192446,
    24646472,
    25100408,
    25551624,
    25996594,
    26432447,
    26850194,
    27247610,
    27635832,
    28031009,
    28439940,
    28888369,
    29362449,
    29783571,
    30045134,
    30081829,
    29846179,
    29390409,
    28870195
];

function draw(context, colors, width, height, x, y, px, py) {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    context.strokeStyle = colors.bgSecondary;

    context.beginPath();
    context.moveTo(x(1960), y(d3_min(population)));
    context.lineTo(x(1960), y(d3_max(population)));
    context.stroke();

    context.beginPath();
    context.moveTo(x(1960), y(d3_min(population)));
    context.lineTo(x(2018), y(d3_min(population)));
    context.stroke();

    context.beginPath();
    context.moveTo(x(1960), y(d3_min(population)));
    
    range(startYear, endYear).forEach(year => {
        const pop = population[year - startYear];
        context.lineTo(x(year), y(pop));
    });
    context.stroke();

    context.font = "14px Arial";
    range(startYear, endYear, 5).forEach(year => {
        context.textAlign = "center";
        context.fillText(`${year}`, x(year), y(d3_min(population)) + 20);
    });

    range(d3_min(population), d3_max(population), Math.floor((d3_max(population) - d3_min(population)) / 10)).forEach(pop => {
        context.textAlign = "right";
        context.fillText(`${pop}`, x(1960) - 10, y(pop) - 5);
    });

    context.font = "18px Arial";
    context.textAlign = "center";
    context.fillText("Population of Venezuela", x(1988) - 10, y(d3_min(population)) + 60);

    if(px && py) {
        context.beginPath();
        context.moveTo(x(px), y(d3_min(population)));
        context.lineTo(x(px), y(d3_max(population)));
        context.stroke();

        context.beginPath();
        context.moveTo(x(1960), y(py));
        context.lineTo(x(2018), y(py));
        context.stroke();
    }
}

export default function TimeSeriesSlide(props) {

    const { colors } = props;

    const canvasRef = useRef();

    function setup() {
        const { canvas, canvasSelection, context, width, height } = setupCanvas(canvasRef);

       
        const x = d3_scaleLinear()
            .domain([1960, 2018])
            .range([100, width - 100]);
        
        const y = d3_scaleLinear()
            .domain(d3_extent(population))
            .range([height - 100, 100]);
        
        draw(context, colors, width, height, x, y);

        canvasSelection.on("mousemove", () => {
            const mouse = d3_mouse(canvas);
            const mouseX = mouse[0];
            const mouseY = mouse[1];
            
            draw(context, colors, width, height, x, y, x.invert(mouseX), y.invert(mouseY));
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