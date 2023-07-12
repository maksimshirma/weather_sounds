import React, { useState, useEffect, useRef } from "react";
import "./box.styles.scss";

type WeatherType = "summer" | "winter" | "rainy";

interface IBox {
    type: WeatherType
    active: WeatherType
    volume: number
}

export const Box = ({ type, active, volume }: IBox): React.ReactNode => {
    const [isPause, setPause] = useState<boolean>(true);
    const myRef = useRef<HTMLAudioElement>();

    const getSound = (): string => {
        if (type === "summer" || type === "winter") return type;
        return "rain"; 
    }

    const togglePause = () => {
        if (isPause) {
            myRef.current.play();
        } else {
            myRef.current.pause();
        }
        setPause(prevState => !prevState);
    }

    useEffect(() => {
        setPause(true);
        myRef.current.pause();
        myRef.current.currentTime = 0.0;
    }, [active]);

    useEffect(() => {
        myRef.current.volume = volume / 100;
    }, [volume]);

    return (
        <div id={type} className={"box " + `box__${type}`} onClick={togglePause}>
            <audio preload="auto" src={`./${getSound()}.mp3`} ref={myRef} />
            { active === type ? (
                    <div className={"box-icon " + (isPause ? "box-icon__pause" : `box-icon__weather__${type}`)}></div>
                ) : (
                    <div className={"box-icon " + `box-icon__weather__${type}`}></div>
                )
            }
            
        </div>
    );
}