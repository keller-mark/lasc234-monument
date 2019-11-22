import React from 'react';
import './App.css';

import Slide from './Slide.js';

const slides = [
    {
        name: 'César Camacho',
        birthYear: 1943,
        birthPlace: {
            name: 'Lima, Peru',
            latLng: [-12.046373, -77.042755]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/C%C3%A9sar_Camacho',
            publications: [
                '10.2307/2007013'
            ]
        },
        keywords: [
            {
                word: 'vector fields',
                wikipedia: 'https://en.wikipedia.org/wiki/Vector_field'
            },
            {
                word: 'manifolds',
                wikipedia: 'https://en.wikipedia.org/wiki/Manifold'
            }
        ]
    },
    {
        name: 'Graciela Boente',
        birthYear: undefined,
        birthPlace: {
            name: 'Buenos Aires, Argentina',
            latLng: [-34.603683, -58.381557]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Graciela_Boente',
            publications: [
                '10.1007/BF02595862'
            ]
        },
        keywords: [
            {
                word: 'statistics',
                wikipedia: 'https://en.wikipedia.org/wiki/Statistics'
            },
            {
                word: 'principal component analysis',
                wikipedia: 'https://en.wikipedia.org/wiki/Principal_component_analysis'
            },
            {
                word: 'regression',
                wikipedia: 'https://en.wikipedia.org/wiki/Regression_analysis'
            }
        ]
    },
    {
        name: 'Newton da Costa',
        birthYear: 1929,
        birthPlace: {
            name: 'Curitiba, Brazil',
            latLng: [-25.480877, -49.304424]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Newton_da_Costa',
            publications: [
                '10.1093/bjps/40.3.333'
            ]
        },
        keywords: [
            {
                word: 'logic',
                wikipedia: 'https://en.wikipedia.org/wiki/Logic'
            },
            {
                word: 'induction',
                wikipedia: 'https://en.wikipedia.org/wiki/Inductive_reasoning'
            },
            {
                word: 'NP-completeness',
                wikipedia: 'https://en.wikipedia.org/wiki/P_versus_NP_problem'
            }
        ]
    }
]

function App() {
    return (
        <div className="app">
            {slides.map(d => (<Slide d={d} />))}
        </div>
    );
}

export default App;
