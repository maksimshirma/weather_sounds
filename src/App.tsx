import React, { useState } from "react";
import { Box, Slider } from "./components";
import { WeatherType } from "./types";
import "./App.scss";

const App: React.FC = () => {
    const [active, setActive] = useState<WeatherType>("summer");
    const [volume, setVolume] = useState<number>(50);

    const toggleActive = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        if (target.closest(".box").classList[0] === "box") {
            setActive(target.closest(".box").id as WeatherType);
        }
    }

    return (
        <div className={"container " + `container__${active}`}>
            <div className="container-content">
                <div className="container-content__title">
                    <h1>Weather Sounds</h1>
                </div>
                <div className="container-content__boxes" onClick={toggleActive}>
                    <Box type="summer" active={active} volume={volume} />
                    <Box type="winter" active={active} volume={volume} />
                    <Box type="rainy" active={active} volume={volume} />
                </div>
                <div className="container-content__slider">
                    <Slider setVolume={setVolume} />
                </div>
            </div>
        </div>
    )
};

export default App;