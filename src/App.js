import React, { useState, useEffect } from 'react';

import Slide from './Slide.js';
import VectorFieldSlide from './slides/VectorFieldSlide.js';
import PCASlide from './slides/PCASlide.js';
import InductionSlide from './slides/InductionSlide.js';
import ConvexSlide from './slides/ConvexSlide.js';
import DemographySlide from './slides/DemographySlide.js';

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
                bold: true,
                wikipedia: 'https://en.wikipedia.org/wiki/Vector_field'
            },
            {
                word: 'manifolds',
                wikipedia: 'https://en.wikipedia.org/wiki/Manifold'
            }
        ],
        colors: [
            "#179ECF",
            "#D81027",
            "#D18326",
            "#E7CA2C",
            "#1AAD5A",
            "#957247"
        ],
        slide: VectorFieldSlide
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
                bold: true,
                wikipedia: 'https://en.wikipedia.org/wiki/Principal_component_analysis'
            },
            {
                word: 'regression',
                wikipedia: 'https://en.wikipedia.org/wiki/Regression_analysis'
            }
        ],
        colors: [
            "#77AEDE",
            "#F5B42C",
            "#751F0A"
        ],
        slide: PCASlide
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
                bold: true,
                wikipedia: 'https://en.wikipedia.org/wiki/Inductive_reasoning'
            },
            {
                word: 'NP-completeness',
                wikipedia: 'https://en.wikipedia.org/wiki/P_versus_NP_problem'
            }
        ],
        colors: [
            "#159B3D",
            "#FDDE32",
            "#032575"
        ],
        slide: InductionSlide
    },
    {
        name: 'Marília Chaves Peixoto',
        birthYear: 1921,
        birthPlace: {
            name: 'Rio de Janeiro, Brazil',
            latLng: [-22.906847, -43.172897]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Mar%C3%ADlia_Chaves_Peixoto',
            publications: [
                ''
            ]
        },
        keywords: [
            {
                word: 'dynamical systems',
                wikipedia: 'https://en.wikipedia.org/wiki/Dynamical_system'
            },
            {
                word: 'convex functions',
                bold: true,
                wikipedia: 'https://en.wikipedia.org/wiki/Convex_function'
            },
            {
                word: 'planes',
                wikipedia: 'https://en.wikipedia.org/wiki/Plane_(geometry)'
            },
            {
                word: 'saddle points',
                wikipedia: 'https://en.wikipedia.org/wiki/Saddle_point'
            }
        ],
        colors: [
            "#FDDE32",
            "#159B3D",
            "#032575"
        ],
        slide: ConvexSlide
    },
    {
        name: 'Carmen Miró',
        birthYear: 1919,
        birthPlace: {
            name: 'Panama',
            latLng: [8.537981, -80.782127]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Carmen_A._Mir%C3%B3',
            publications: [
                ''
            ]
        },
        keywords: [
            {
                word: 'statistics',
                wikipedia: 'https://en.wikipedia.org/wiki/Statistics'
            },
            {
                word: 'demography',
                bold: true,
                wikipedia: 'https://en.wikipedia.org/wiki/Demography'
            }
        ],
        colors: [
            "#095392",
            "#D11036",
            "#E9C02B",
            "#159A4E",
            "#1792DE"
        ],
        slide: DemographySlide
    },
    {
        name: 'Raquel Prado',
        birthYear: 1970,
        birthPlace: {
            name: 'Venezuela',
            latLng: [6.423750, -66.589729]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Raquel_Prado',
            publications: [

            ]
        },
        keywords: [
            {
                word: 'time series data',
                bold: true,
                wikipedia: 'https://en.wikipedia.org/wiki/Time_series'
            },
            {
                word: 'Bayesian inference',
                wikipedia: 'https://en.wikipedia.org/wiki/Bayesian_inference'
            }
        ],
        colors: [
            "#FECC2F",
            "#03237C",
            "#CE132D",
            "#1F6427"
        ]
    },
    {
        name: 'Argelia Velez-Rodriguez',
        birthYear: 1936,
        birthPlace: {
            name: 'Havana, Cuba',
            latLng: [23.113592, -82.366592]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Argelia_Velez-Rodriguez',
            publications: [

            ]
        },
        keywords: [
            {
                word: 'mathematics education',
                bold: true,
                wikipedia: 'https://en.wikipedia.org/wiki/Mathematics_education'
            }
        ],
        colors: [
            "#042A8E",
            "#CE132D"
        ]
    }
]

export default function App() {

    const [currentSlideIndex, setCurrentSlideIndex] = useState(3);

    function getPrevSlideIndex() {
        if(currentSlideIndex === 0) {
            return (slides.length - 1);
        } else {
            return (currentSlideIndex - 1);
        }
    }

    function getNextSlideIndex() {
        return ((currentSlideIndex + 1) % slides.length);
    }

    function onPrevSlide() {
        setCurrentSlideIndex(getPrevSlideIndex())
    }

    function onNextSlide() {
        setCurrentSlideIndex(getNextSlideIndex());
    }

    useEffect(() => {
        const handleKeydown = (event) => {
            if(event.code === 'ArrowLeft') {
                onPrevSlide();
            } else if(event.code === 'ArrowRight') {
                onNextSlide();
            }
        }
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    });

    return (
        <div className="app">
            <Slide 
                d={slides[currentSlideIndex]} 
                onPrevSlide={onPrevSlide}
                onNextSlide={onNextSlide}
            />
        </div>
    );
}