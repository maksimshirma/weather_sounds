import React, { useState } from "react";
import { Box, Slider } from "./components";
import "./App.scss";

type WeatherType = "summer" | "winter" | "rainy";

const App = (): React.ReactNode => {
    const [active, setActive] = useState<WeatherType>("summer");
    const [volume, setVolume] = useState<number>(50);

    const toggleActive = (event: any) => {
        if (event.target.closest(".box").classList[0] === "box") {
            setActive(event.target.closest(".box").id);
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