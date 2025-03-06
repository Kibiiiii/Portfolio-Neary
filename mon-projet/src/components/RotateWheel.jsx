import React, { useState, useEffect } from "react";
import "../style/rotatewheel.css";

const segments = [
    { label: "À propos", deg: 0 },
    { label: "CV", deg: 72 },
    { label: "Compétences", deg: 144 },
    { label: "Projets", deg: 216 },
    { label: "Contact", deg: 288 },
];

const Wheel = () => {
    const [rotation, setRotation] = useState(0);
    const [outerRotation, setOuterRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(true);

    useEffect(() => {
        let interval;
        if (isRotating) {
            interval = setInterval(() => {
                setRotation((prev) => prev + 1);
                setOuterRotation((prev) => prev - 1); // Rotation inverse pour le cercle extérieur
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isRotating]);

    return (
        <div 
            className="wheel-container" 
            onMouseEnter={() => setIsRotating(false)} 
            onMouseLeave={() => setIsRotating(true)}
        >
            <div className="outermost-circle-container">
                <div className="outermost-circle" style={{ transform: `rotate(${outerRotation}deg)` }}></div>
            </div>
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
                        <text key={index} fill="white" fontSize="16" fontWeight="bold">
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
            <div className="middle-circle"></div>
            <div className="inner-circle"></div>
            <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}></div>
        </div>
    );
};

export default Wheel;
