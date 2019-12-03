import React, { useState, useEffect } from 'react';

import Slide from './Slide.js';
import VectorFieldSlide from './slides/VectorFieldSlide.js';
import PCASlide from './slides/PCASlide.js';

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
            "#D81027",
            "#1280A8",
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
        ]
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
                wikipedia: ''
            },
            {
                word: 'convex functions',
                wikipedia: ''
            },
            {
                word: 'planes',
                wikipedia: ''
            },
            {
                word: 'saddle points',
                wikipedia: ''
            }
        ],
        colors: [
            "#159B3D",
            "#FDDE32",
            "#032575"
        ]
    },
    {
        name: 'Santiago López de Medrano',
        birthYear: 1942,
        birthPlace: {
            name: 'Mexico City, Mexico',
            latLng: [19.432608, -99.133209]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Santiago_L%C3%B3pez_de_Medrano',
            publications: [
                ''
            ]
        },
        keywords: [
            {
                word: 'knot theory',
                wikipedia: ''
            },
            {
                word: 'differential topology',
                wikipedia: ''
            }
        ],
        colors: [
            "#0B6846",
            "#CD1028",
            "#8F4420",
            "#9DA26B",
            "#F8C0C9",
            "#38C4DB",
            "#F7C849",
            "#148488"
        ]
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
                wikipedia: 'https://en.wikipedia.org/wiki/Demography'
            }
        ],
        colors: [
            "#095392",
            "#D11036",
            "#E9C02B",
            "#159A4E",
            "#1792DE"
        ]
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
        colors: [
            "#FECC2F",
            "#03237C",
            "#CE132D",
            "#1F6427"
        ]
    },
    {
        name: 'Gustavo Ponce',
        birthYear: 1952,
        birthPlace: {
            name: 'Venezuela',
            latLng: [6.423750, -66.589729]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Gustavo_Ponce',
            publications: [

            ]
        },
        colors: [
            "#FECC2F",
            "#03237C",
            "#CE132D",
            "#1F6427"
        ]
    },
    {
        name: 'Tatiana Toro',
        birthYear: 1964,
        birthPlace: {
            name: 'Colombia',
            latLng: [4.570868, -74.297333]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Tatiana_Toro',
            publications: [

            ]
        },
        colors: [
            "#FBD133",
            "#063892",
            "#CD1028"
        ]
    },
    {
        name: 'José Escobar',
        birthYear: 1954,
        birthPlace: {
            name: 'Manizales, Colombia',
            latLng: [5.070275, -75.513817]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Jos%C3%A9_F._Escobar',
            publications: [

            ]
        },
        colors: [
            "#FBD133",
            "#063892",
            "#CD1028"
        ]
    },
    {
        name: 'Miriam Leiva',
        birthYear: undefined,
        birthPlace: {
            name: 'Cuba',
            latLng: [21.521757, -77.781166]
        },
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Miriam_Leiva',
            publications: [

            ]
        },
        colors: [
            "#042A8E",
            "#CE132D"
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
        colors: [
            "#042A8E",
            "#CE132D"
        ]
    }
]

export default function App() {

    const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

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