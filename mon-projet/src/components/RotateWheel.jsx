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
    const [lightRotation, setLightRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(true);
    const [selectedSegment, setSelectedSegment] = useState(null);

    useEffect(() => {
        let interval;
        if (isRotating) {
            interval = setInterval(() => {
                setRotation((prev) => prev + 0.2); // Roue principale plus lente
                setOuterRotation((prev) => prev - 0.2); // Cercle extérieur en contre-sens
                setLightRotation((prev) => prev - 0.2); // Inverser la rotation des points lumineux
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
            {/* Cercle extérieur qui tourne */}
            <div className="outermost-circle" style={{ transform: `rotate(${outerRotation}deg)` }}>
                <div className="rotating-lights" style={{ transform: `rotate(${lightRotation}deg)` }}>
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="light-point" 
                            style={{ 
                                transform: `rotate(${i * 45}deg) translate(210px) translateY(-5px)`, // Centrage précis
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
                        <text key={index} fill="white" fontSize="16" fontWeight="bold" onClick={() => setSelectedSegment(segment.label)} style={{ cursor: 'pointer' }}>
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
            
            {/* Affichage du segment sélectionné */}
            {selectedSegment && (
                <div className="selected-segment">{selectedSegment}</div>
            )}
            
            {/* Cercles internes */}
            <div className="inner-circle"></div>
            <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}></div>
        </div>
    );
};

export default Wheel;