import React from "react";
import Background from "./components/Background";
import Wheel from "./components/RotateWheel";
import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Background />
            <Wheel />
        </div>
    );
};

export default App;



