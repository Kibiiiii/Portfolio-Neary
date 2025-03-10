import React from "react";

const CV = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Mon CV</h1>
            <a href="/cv.pdf" download>
                <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                    Télécharger mon CV
                </button>
            </a>
        </div>
    );
};

export default CV;
