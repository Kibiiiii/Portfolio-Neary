import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/rotatewheel.css";

const segments = [
    { label: "À propos", path: "/a-propos", deg: 0 },
    { label: "CV", path: "/cv", deg: 72 },
    { label: "Compétences", path: "/competences", deg: 144 },
    { label: "Projets", path: "/projets", deg: 216 },
    { label: "Contact", path: "/contact", deg: 288 },
];

const Wheel = () => {
    const [rotation, setRotation] = useState(0);
    const [outerRotation, setOuterRotation] = useState(0);
    const [lightRotation, setLightRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(true);

    const navigate = useNavigate(); // Utilisation de useNavigate

    useEffect(() => {
        let interval;
        if (isRotating) {
            interval = setInterval(() => {
                setRotation((prev) => prev + 0.2);
                setOuterRotation((prev) => prev - 0.2);
                setLightRotation((prev) => prev - 0.2);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isRotating]);

    const handleClick = (path) => {
        navigate(path); // Redirection vers la route cliquée
    };

    return (
        <div 
            className="wheel-container" 
            onMouseEnter={() => setIsRotating(false)} 
            onMouseLeave={() => setIsRotating(true)}
        >
            {/* Cercle extérieur qui tourne */}
            <div className="outermost-circle" style={{ transform: `rotate(${outerRotation}deg)` }}>
                <div className="rotating-lights" style={{ transform: `rotate(${lightRotation}deg)` }}>
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="light-point" 
                            style={{ 
                                transform: `rotate(${i * 45}deg) translate(210px) translateY(-5px)`,
                            }} 
                        />
                    ))}
                </div>
            </div>

            {/* Cercle contenant les segments */}
            <div className="outer-circle" style={{ transform: `rotate(${rotation}deg)` }}>
                <svg width="400" height="400" viewBox="0 0 400 400" className="wheel-svg">
                    <defs>
                        {segments.map((segment, index) => (
                            <path
                                key={index}
                                id={`arc${index}`}
                                d={`M ${200 + Math.cos((segment.deg - 90) * Math.PI / 180) * 160} 
                                    ${200 + Math.sin((segment.deg - 90) * Math.PI / 180) * 160} 
                                    A 160 160 0 0 1 
                                    ${200 + Math.cos((segment.deg + 72 - 90) * Math.PI / 180) * 160} 
                                    ${200 + Math.sin((segment.deg + 72 - 90) * Math.PI / 180) * 160}`}
                                fill="none"
                                stroke="transparent"
                            />
                        ))}
                    </defs>
                    {segments.map((segment, index) => (
                        <text 
                            key={index} 
                            fill="white" 
                            fontSize="16" 
                            fontWeight="bold" 
                            onClick={() => handleClick(segment.path)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <textPath 
                                href={`#arc${index}`} 
                                startOffset="50%" 
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {segment.label}
                            </textPath>
                        </text>
                    ))}
                </svg>
            </div>

            {/* Cercles internes */}
            <div className="inner-circle"></div>
            <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}></div>
        </div>
    );
};

export default Wheel;

